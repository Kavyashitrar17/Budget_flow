import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BudgetForm, { ExpenseItem } from '@/components/BudgetForm';
import BudgetChart from '@/components/BudgetChart';

const Index = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [fixedExpenses, setFixedExpenses] = useState<ExpenseItem[]>([]);
  const [variableExpenses, setVariableExpenses] = useState<ExpenseItem[]>([]);
  const [savingsGoal, setSavingsGoal] = useState<number>(0);

  // 🔥 LOAD DATA (FIXED)
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('currentBudget');

      if (savedData) {
        const parsed = JSON.parse(savedData);

        setMonthlyIncome(parsed.monthlyIncome || 0);
        setFixedExpenses(parsed.fixedExpenses || []);
        setVariableExpenses(parsed.variableExpenses || []);
        setSavingsGoal(parsed.savingsGoal || 0);
      }
    } catch (error) {
      console.error('Error loading budget data:', error);
    }
  }, []);

  // 🔥 SAVE DATA AUTOMATICALLY (NEW)
  useEffect(() => {
    const data = {
      monthlyIncome,
      fixedExpenses,
      variableExpenses,
      savingsGoal
    };

    localStorage.setItem('currentBudget', JSON.stringify(data));
  }, [monthlyIncome, fixedExpenses, variableExpenses, savingsGoal]);

  // 🔥 CALCULATIONS (UNCHANGED BUT SAFE)
  const totalFixedExpenses = fixedExpenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const totalVariableExpenses = variableExpenses.reduce(
    (sum, item) => sum + (Number(item.amount) || 0),
    0
  );

  const totalExpenses = totalFixedExpenses + totalVariableExpenses;

  const remainingBalance = monthlyIncome - totalExpenses - savingsGoal;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE - FORM */}
          <div className="lg:col-span-2">
            <BudgetForm
              monthlyIncome={monthlyIncome}
              setMonthlyIncome={setMonthlyIncome}
              fixedExpenses={fixedExpenses}
              setFixedExpenses={setFixedExpenses}
              variableExpenses={variableExpenses}
              setVariableExpenses={setVariableExpenses}
              savingsGoal={savingsGoal}
              setSavingsGoal={setSavingsGoal}
            />
          </div>

          {/* RIGHT SIDE - CHART */}
          <div className="lg:col-span-1">
            <BudgetChart
              fixedExpenses={fixedExpenses}
              variableExpenses={variableExpenses}
              savingsGoal={savingsGoal}
              remainingBalance={remainingBalance}
            />
          </div>

        </div>
      </main>
    </div>
  );
};

export default Index;