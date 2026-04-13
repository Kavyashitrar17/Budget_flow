import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Download, Trash2 } from 'lucide-react';
import { ExpenseItem } from './BudgetForm';

type BudgetPlan = {
  monthlyIncome: number;
  fixedExpenses: ExpenseItem[];
  variableExpenses: ExpenseItem[];
  savingsGoal: number;
  savingsGoalPercentage: number;
  date: string;
};

const SavedPlans = () => {
  const [savedPlans, setSavedPlans] = useState<BudgetPlan[]>([]);
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('budgetPlans');
      const plans = stored ? JSON.parse(stored) : [];
      setSavedPlans(plans);
    } catch (error) {
      console.error('Error loading saved plans:', error);
      toast.error('Failed to load saved plans.');
    }
  }, []);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    
    const [year, month] = dateString.split('-');
    const date = new Date(Number(year), Number(month) - 1);
    
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  const calculateTotalExpenses = (plan: BudgetPlan) => {
    const fixedTotal = plan.fixedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const variableTotal = plan.variableExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    return fixedTotal + variableTotal;
  };
  
  const calculateRemaining = (plan: BudgetPlan) => {
    const totalExpenses = calculateTotalExpenses(plan);
    return plan.monthlyIncome - totalExpenses - plan.savingsGoal;
  };
  
  const downloadPlanData = (plan: BudgetPlan) => {
    const totalExpenses = calculateTotalExpenses(plan);
    const remaining = calculateRemaining(plan);
    
    const fixedExpensesText = plan.fixedExpenses
      .map(exp => `${exp.name}: ₹${exp.amount.toFixed(2)}`)
      .join('\n');
      
    const variableExpensesText = plan.variableExpenses
      .map(exp => `${exp.name}: ₹${exp.amount.toFixed(2)}`)
      .join('\n');
    
    const planData = `
    Budget Plan for ${formatDate(plan.date)}
    ===============================
    
    Monthly Income: ₹${plan.monthlyIncome.toFixed(2)}
    
    FIXED EXPENSES:
    ${fixedExpensesText || 'None'}
    
    VARIABLE EXPENSES:
    ${variableExpensesText || 'None'}
    
    SUMMARY:
    Total Expenses: ₹${totalExpenses.toFixed(2)}
    Savings Goal: ₹${plan.savingsGoal.toFixed(2)} (${plan.savingsGoalPercentage.toFixed(1)}% of income)
    Remaining Balance: ₹${remaining.toFixed(2)}
    `;
    
    const element = document.createElement('a');
    const file = new Blob([planData], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `budget-plan-${plan.date}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast.success('Budget plan downloaded successfully!');
  };
  
  const deletePlan = (date: string) => {
    try {
      const filteredPlans = savedPlans.filter(plan => plan.date !== date);
      localStorage.setItem('budgetPlans', JSON.stringify(filteredPlans));
      setSavedPlans(filteredPlans);
      toast.success('Budget plan deleted successfully!');
    } catch (error) {
      console.error('Error deleting plan:', error);
      toast.error('Failed to delete plan.');
    }
  };
  
  const resetAllData = () => {
    if (window.confirm('Are you sure you want to reset all budget data? This cannot be undone.')) {
      try {
        localStorage.removeItem('budgetPlans');
        setSavedPlans([]);
        toast.success('All budget data has been reset.');
      } catch (error) {
        console.error('Error resetting data:', error);
        toast.error('Failed to reset data.');
      }
    }
  };
  
  return (
    <Card className="border border-border shadow-sm animate-fade-in">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg">Saved Budget Plans</CardTitle>
        {savedPlans.length > 0 && (
          <Button variant="destructive" size="sm" onClick={resetAllData}>
            Reset All Data
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {savedPlans.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Income</TableHead>
                  <TableHead>Expenses</TableHead>
                  <TableHead>Savings</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savedPlans.map((plan, index) => {
                  const totalExpenses = calculateTotalExpenses(plan);
                  const remaining = calculateRemaining(plan);
                  
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {formatDate(plan.date)}
                      </TableCell>
                      <TableCell>₹{plan.monthlyIncome.toFixed(2)}</TableCell>
                      <TableCell>₹{totalExpenses.toFixed(2)}</TableCell>
                      <TableCell>₹{plan.savingsGoal.toFixed(2)}</TableCell>
                      <TableCell className={remaining < 0 ? "text-destructive" : "text-green-600"}>
                        ₹{remaining.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => downloadPlanData(plan)}
                            className="h-8 w-8"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deletePlan(plan.date)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>No saved budget plans yet.</p>
            <p className="text-sm mt-2">
              Go to the Budget Planner page to create your first budget plan.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedPlans;
