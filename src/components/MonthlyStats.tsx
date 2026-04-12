import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Wallet, Target } from 'lucide-react';
import { ExpenseItem } from './BudgetForm';

type MonthlyStatsProps = {
  monthlyIncome: number;
  fixedExpenses: ExpenseItem[];
  variableExpenses: ExpenseItem[];
  savingsGoal: number;
};

const MonthlyStats: React.FC<MonthlyStatsProps> = ({
  monthlyIncome,
  fixedExpenses,
  variableExpenses,
  savingsGoal,
}) => {
  const totalFixedExpenses = fixedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalVariableExpenses = variableExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalExpenses = totalFixedExpenses + totalVariableExpenses;
  const actualSavings = monthlyIncome - totalExpenses;
  
  const savingsPercentage = monthlyIncome > 0 ? (actualSavings / monthlyIncome) * 100 : 0;
  const savingsGoalProgress = savingsGoal > 0 ? (actualSavings / savingsGoal) * 100 : 0;
  const expensePercentage = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;
  
  const allExpenses = [...fixedExpenses, ...variableExpenses];
  
  const biggestExpense = allExpenses.reduce(
    (max, current) => (current.amount > max.amount ? current : max),
    { id: '', name: 'None', amount: 0, category: 'fixed' as const }
  );
  
  const biggestExpensePercentage = monthlyIncome > 0 
    ? (biggestExpense.amount / monthlyIncome) * 100 
    : 0;
  
  const statsCards = [
    {
      title: "Monthly Income",
      value: `₹${monthlyIncome.toFixed(2)}`,
      icon: <Wallet className="h-4 w-4 text-primary" />,
      description: "Your total monthly income",
    },
    {
      title: "Monthly Savings",
      value: `₹${actualSavings.toFixed(2)}`,
      percentage: savingsPercentage.toFixed(1),
      isPositive: savingsPercentage > 0,
      icon: savingsPercentage > 0 
        ? <ArrowUpRight className="h-4 w-4 text-green-500" />
        : <ArrowDownRight className="h-4 w-4 text-destructive" />,
      description: `${savingsPercentage.toFixed(1)}% of income saved`,
    },
    {
      title: "Total Expenses",
      value: `₹${totalExpenses.toFixed(2)}`,
      percentage: expensePercentage.toFixed(1),
      isPositive: expensePercentage < 80,
      icon: expensePercentage < 80
        ? <ArrowDownRight className="h-4 w-4 text-green-500" />
        : <ArrowUpRight className="h-4 w-4 text-destructive" />,
      description: `${expensePercentage.toFixed(1)}% of income spent`,
    },
    {
      title: "Biggest Expense",
      value: `₹${biggestExpense.amount.toFixed(2)}`,
      percentage: biggestExpensePercentage.toFixed(1),
      isPositive: false,
      icon: <Target className="h-4 w-4 text-secondary" />,
      description: biggestExpense.name === 'None' 
        ? "No expenses added yet" 
        : `${biggestExpense.name} (${biggestExpensePercentage.toFixed(1)}% of income)`,
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((card, index) => (
        <Card 
          key={index} 
          className={`border border-border shadow-sm animate-fade-in delay-${index * 100}`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{card.value}</span>
                {card.percentage && (
                  <span className={card.isPositive ? "text-green-500" : "text-destructive"}>
                    {card.percentage}%
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="border border-border shadow-sm col-span-1 md:col-span-2 lg:col-span-4 animate-fade-in delay-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Savings Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current: ₹{actualSavings.toFixed(2)}</span>
              <span>Goal: ₹{savingsGoal.toFixed(2)}</span>
            </div>
            <Progress value={Math.min(savingsGoalProgress, 100)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {savingsGoalProgress >= 100
                ? "Congratulations! You've reached your savings goal."
                : `You're ${savingsGoalProgress.toFixed(1)}% of the way to your savings goal.`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyStats;
