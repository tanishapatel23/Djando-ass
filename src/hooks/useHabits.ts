import { useState, useEffect } from 'react';
import { Habit, HabitCompletion } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { useAuth } from '../contexts/AuthContext';

export function useHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useLocalStorage<Habit[]>('habit-builder-habits', []);
  const [completions, setCompletions] = useLocalStorage<HabitCompletion[]>('habit-builder-completions', []);

  const userHabits = habits.filter(h => h.userId === user?.id);

  const addHabit = (name: string) => {
    if (!user) return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (id: string, name: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, name } : h));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    setCompletions(completions.filter(c => c.habitId !== id));
  };

  const toggleCompletion = (habitId: string, date: string) => {
    if (!user) return;

    const existingCompletion = completions.find(
      c => c.habitId === habitId && c.date === date && c.userId === user.id
    );

    if (existingCompletion) {
      setCompletions(completions.map(c => 
        c.id === existingCompletion.id ? { ...c, completed: !c.completed } : c
      ));
    } else {
      const newCompletion: HabitCompletion = {
        id: Date.now().toString(),
        habitId,
        userId: user.id,
        date,
        completed: true,
      };
      setCompletions([...completions, newCompletion]);
    }
  };

  const getCompletion = (habitId: string, date: string): boolean => {
    if (!user) return false;
    const completion = completions.find(
      c => c.habitId === habitId && c.date === date && c.userId === user.id
    );
    return completion?.completed || false;
  };

  const getStreak = (habitId: string): number => {
    if (!user) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      if (getCompletion(habitId, dateString)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const isOverdue = (habitId: string): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];
    
    return !getCompletion(habitId, yesterdayString);
  };

  return {
    habits: userHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    getCompletion,
    getStreak,
    isOverdue,
  };
}