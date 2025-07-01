import React, { useState } from 'react';
import { useHabits } from '../hooks/useHabits';
import { Calendar, CheckCircle2, AlertTriangle, Flame } from 'lucide-react';

export function DashboardPage() {
  const { habits, toggleCompletion, getCompletion, isOverdue, getStreak } = useHabits();
  const [completions, setCompletions] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  React.useEffect(() => {
    const todayCompletions: Record<string, boolean> = {};
    habits.forEach(habit => {
      todayCompletions[habit.id] = getCompletion(habit.id, today);
    });
    setCompletions(todayCompletions);
  }, [habits, getCompletion, today]);

  const handleCheckboxChange = (habitId: string) => {
    setCompletions(prev => ({
      ...prev,
      [habitId]: !prev[habitId]
    }));
  };

  const handleSaveProgress = () => {
    Object.entries(completions).forEach(([habitId, completed]) => {
      const currentCompletion = getCompletion(habitId, today);
      if (completed !== currentCompletion) {
        toggleCompletion(habitId, today);
      }
    });
    
    setMessage('Progress saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (habits.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Habits Yet</h2>
          <p className="text-gray-600 mb-6">
            Start building better habits by creating your first one!
          </p>
          <a
            href="/habits"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Your First Habit
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Tracking</h1>
        <div className="flex items-center text-gray-600">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="text-lg">{todayFormatted}</span>
        </div>
      </div>

      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Habits</h2>
        
        <div className="space-y-4">
          {habits.map(habit => {
            const overdue = isOverdue(habit.id);
            const streak = getStreak(habit.id);
            
            return (
              <div
                key={habit.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  overdue ? 'border-amber-200 bg-amber-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={completions[habit.id] || false}
                      onChange={() => handleCheckboxChange(habit.id)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      completions[habit.id] 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300 hover:border-green-400'
                    }`}>
                      {completions[habit.id] && (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                  </label>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{habit.name}</h3>
                    {overdue && (
                      <div className="flex items-center text-amber-600 text-sm mt-1">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Missed yesterday
                      </div>
                    )}
                  </div>
                </div>
                
                {streak > 0 && (
                  <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <Flame className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{streak} day streak</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveProgress}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  );
}