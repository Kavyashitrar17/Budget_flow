
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ExpenseItem } from './BudgetForm';

type BudgetChartProps = {
  fixedExpenses: ExpenseItem[];
  variableExpenses: ExpenseItem[];
  savingsGoal: number;
  remainingBalance: number;
};

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#F2FCE2', '#D3E4FD'];

const BudgetChart: React.FC<BudgetChartProps> = ({
  fixedExpenses,
  variableExpenses,
  savingsGoal,
  remainingBalance,
}) => {
  const totalFixedExpenses = fixedExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalVariableExpenses = variableExpenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  
  // Prepare chart data
  const chartData = [
    {
      name: 'Fixed Expenses',
      value: totalFixedExpenses,
    },
    {
      name: 'Variable Expenses',
      value: totalVariableExpenses,
    },
    {
      name: 'Savings',
      value: savingsGoal,
    },
  ];
  
  // Add remaining balance if positive
  if (remainingBalance > 0) {
    chartData.push({
      name: 'Unallocated',
      value: remainingBalance,
    });
  }
  
  // Filter out zero values
  const filteredChartData = chartData.filter(item => item.value > 0);
  
  return (
    <Card className="border border-border shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="text-lg">Budget Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={filteredChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {filteredChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${Number(value).toFixed(2)}`} 
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[240px] flex items-center justify-center text-muted-foreground">
            Add budget items to see your distribution
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetChart;
