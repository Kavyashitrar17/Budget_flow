import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">BudgetFlow Documentation</h1>
            <p className="text-muted-foreground">Complete guide to using BudgetFlow effectively</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with BudgetFlow</CardTitle>
                <CardDescription>Learn the basics of budget planning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">What is BudgetFlow?</h3>
                  <p className="text-muted-foreground">
                    BudgetFlow is a comprehensive budget planning application designed to help you take control 
                    of your finances. Whether you're tracking monthly expenses, setting savings goals, or looking 
                    for ways to optimize your spending, BudgetFlow provides the tools you need to succeed.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Monthly income and expense tracking</li>
                    <li>Visual budget breakdown with interactive charts</li>
                    <li>Smart savings suggestions based on your profile</li>
                    <li>Save multiple budget plans</li>
                    <li>Dashboard with comprehensive statistics</li>
                    <li>Secure local storage of your financial data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Creating Your First Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 1: Enter Your Monthly Income</h3>
                  <p className="text-muted-foreground">
                    Start by entering your total monthly income. This is the foundation of your budget and includes 
                    all sources of income such as salary, freelance work, investments, or any other regular income.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 2: Add Fixed Expenses</h3>
                  <p className="text-muted-foreground mb-2">
                    Fixed expenses are costs that remain constant each month. These typically include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Rent or mortgage payments</li>
                    <li>Insurance premiums</li>
                    <li>Subscription services (Netflix, Spotify, etc.)</li>
                    <li>Loan payments</li>
                    <li>Utilities (if consistent monthly)</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 3: Add Variable Expenses</h3>
                  <p className="text-muted-foreground mb-2">
                    Variable expenses fluctuate from month to month. Common categories include:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Groceries and food</li>
                    <li>Entertainment and dining out</li>
                    <li>Transportation and fuel</li>
                    <li>Clothing and personal care</li>
                    <li>Healthcare expenses</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 4: Set Your Savings Goal</h3>
                  <p className="text-muted-foreground">
                    Determine how much you want to save each month. A common recommendation is to save at least 
                    20% of your income, but adjust this based on your personal financial goals and circumstances.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Step 5: Review and Save</h3>
                  <p className="text-muted-foreground">
                    Once you've entered all your information, review the budget breakdown chart to see how your 
                    income is allocated. If you're satisfied, give your budget plan a name and save it for future reference.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Understanding Your Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Monthly Statistics</h3>
                  <p className="text-muted-foreground">
                    The dashboard displays key financial metrics including total income, total expenses, savings amount, 
                    and remaining balance. Use these statistics to get a quick overview of your financial health.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget Visualization</h3>
                  <p className="text-muted-foreground">
                    The pie chart provides a visual representation of how your income is distributed across different 
                    categories. Each segment shows both the amount and percentage of your total income. Hover over 
                    segments to see detailed information.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Saved Plans</h3>
                  <p className="text-muted-foreground">
                    Access all your previously saved budget plans from the dashboard. You can load any saved plan 
                    to view its details or use it as a template for creating a new budget.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Smart Savings Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">How It Works</h3>
                  <p className="text-muted-foreground">
                    Smart Savings analyzes your budget data along with your age and profession to provide personalized 
                    recommendations. The system considers various factors to suggest practical ways to optimize your 
                    spending and increase your savings.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Types of Suggestions</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li><strong>Expense Reduction:</strong> Identify areas where you can cut costs</li>
                    <li><strong>Savings Optimization:</strong> Strategies to increase your savings rate</li>
                    <li><strong>Financial Planning:</strong> Long-term financial advice based on your profile</li>
                    <li><strong>Investment Opportunities:</strong> Suggestions for growing your savings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips for Effective Budgeting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">1. Be Realistic</h3>
                  <p className="text-muted-foreground">
                    Set achievable goals and budget amounts. It's better to start conservative and adjust upward 
                    than to set unrealistic targets that you can't maintain.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">2. Review Regularly</h3>
                  <p className="text-muted-foreground">
                    Check your budget weekly or bi-weekly to ensure you're staying on track. Make adjustments as 
                    needed based on actual spending patterns.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">3. Plan for Irregular Expenses</h3>
                  <p className="text-muted-foreground">
                    Don't forget about quarterly or annual expenses like car insurance, property taxes, or gifts. 
                    Factor these into your monthly budget by setting aside money each month.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">4. Build an Emergency Fund</h3>
                  <p className="text-muted-foreground">
                    Aim to save 3-6 months of expenses in an easily accessible emergency fund before focusing on 
                    other financial goals.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">5. Track Your Progress</h3>
                  <p className="text-muted-foreground">
                    Use the dashboard to monitor your financial progress over time. Celebrate milestones and adjust 
                    your strategy when needed.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Privacy & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Local Storage</h3>
                  <p className="text-muted-foreground">
                    All your financial data is stored locally in your browser using secure local storage. Your 
                    information never leaves your device and is not sent to any external servers.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Data Backup</h3>
                  <p className="text-muted-foreground">
                    Since data is stored locally, it's important to regularly back up your information. Take 
                    screenshots of your budget plans or export data when that feature becomes available.
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Browser Data</h3>
                  <p className="text-muted-foreground">
                    Note that clearing your browser's cache and cookies will also remove your saved budget plans. 
                    Be cautious when performing browser maintenance.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
