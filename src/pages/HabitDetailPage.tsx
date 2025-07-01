import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHabits } from '../hooks/useHabits';
import { ArrowLeft, Check, X, Flame, Calendar } from 'lucide-react';

export function HabitDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { habits, getCompletion, getStreak } = useHabits();
  
  const habit = habits.find(h => h.id === id);
  
  if (!habit) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Habit Not Found</h1>
        <Link
          to="/habits"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Back to My Habits
        </Link>
      </div>
    );
  }

  const streak = getStreak(habit.id);
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/habits"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to My Habits
        </Link>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{habit.name}</h1>
          {streak > 0 && (
            <div className="flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
              <Flame className="h-5 w-5 mr-2" />
              <span className="font-semibold">{streak} day streak</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-gray-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Last 7 Days</h2>
        </div>
        
        <div className="grid grid-cols-7 gap-4">
          {last7Days.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const completed = getCompletion(habit.id, dateString);
            const isToday = dateString === new Date().toISOString().split('T')[0];
            
            return (
              <div
                key={dateString}
                className={`text-center p-4 rounded-lg border transition-all ${
                  isToday 
                    ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200' 
                    : 'border-gray-200'
                } ${completed ? 'bg-green-50' : 'bg-gray-50'}`}
              >
                <div className="text-sm font-medium text-gray-600 mb-2">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-3">
                  {date.getDate()}
                </div>
                <div className="flex justify-center">
                  {completed ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <X className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                </div>
                {isToday && (
                  <div className="text-xs text-blue-600 font-medium mt-2">
                    Today
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Progress Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Completed this week:</span>
              <span className="ml-2 font-semibold text-green-600">
                {last7Days.filter(date => getCompletion(habit.id, date.toISOString().split('T')[0])).length}/7 days
              </span>
            </div>
            <div>
              <span className="text-gray-600">Current streak:</span>
              <span className="ml-2 font-semibold text-orange-600">
                {streak} days
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}