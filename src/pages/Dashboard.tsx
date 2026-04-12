
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/DashboardHeader';
import MonthlyStats from '@/components/MonthlyStats';
import SavedPlans from '@/components/SavedPlans';
import { ExpenseItem } from '@/components/BudgetForm';
import { generateSuggestions } from "@/utils/aiSuggestions";

type BudgetPlan = {
  monthlyIncome: number;
  fixedExpenses: ExpenseItem[];
  variableExpenses: ExpenseItem[];
  savingsGoal: number;
  savingsGoalPercentage: number;
  date: string;
};

const Dashboard = () => {
  const [currentPlan, setCurrentPlan] = useState<BudgetPlan | null>(null);
  
  useEffect(() => {
    try {
      const savedPlans = JSON.parse(localStorage.getItem('budgetPlans') || '[]');
      if (savedPlans.length > 0) {
        // Get the most recent plan
        const latestPlan = savedPlans[savedPlans.length - 1];
        setCurrentPlan(latestPlan);
      }
    } catch (error) {
      console.error('Error loading budget data:', error);
    }
  }, []);
  const suggestions = generateSuggestions(
  currentPlan?.monthlyIncome || 0,
  currentPlan?.fixedExpenses || [],
  currentPlan?.variableExpenses || [],
  currentPlan?.savingsGoal || 0
);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <DashboardHeader />
        
        {currentPlan ? (
          <MonthlyStats
            monthlyIncome={currentPlan.monthlyIncome}
            fixedExpenses={currentPlan.fixedExpenses}
            variableExpenses={currentPlan.variableExpenses}
            savingsGoal={currentPlan.savingsGoal}
          />
        ) : (
          <div className="bg-muted rounded-lg p-8 text-center animate-fade-in">
            <h2 className="text-xl font-semibold mb-2">No Budget Plan Yet</h2>
            <p className="text-muted-foreground mb-4">
              Create your first budget plan to see your financial stats here.
            </p>
          </div>
        )}
        
        <SavedPlans />
        <SavedPlans />

{/* ✅ AI SMART INSIGHTS */}
<div className="mt-8">
  <h2 className="text-xl font-bold mb-4">AI Smart Insights</h2>

  {suggestions.length === 0 ? (
    <p className="text-muted-foreground">No insights yet</p>
  ) : (
    <div className="space-y-3">
      {suggestions.map((s, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            s.type === "good"
              ? "bg-green-100 text-green-700"
              : s.type === "warning"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {s.message}
        </div>
      ))}
    </div>
  )}
</div>
      </main>
    </div>
  );
};

export default Dashboard;
