import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Help = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Help Center</h1>
            <p className="text-muted-foreground">Find answers to common questions and learn how to use BudgetFlow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Learn the basics of budget planning</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <HelpCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>FAQs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Quick answers to common questions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Get help from our team</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to the most common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create my first budget plan?</AccordionTrigger>
                  <AccordionContent>
                    To create your first budget plan, go to the Budget Planner page, enter your monthly income,
                    add your fixed expenses (rent, utilities, etc.), variable expenses (groceries, entertainment),
                    and set your savings goal. Click "Save Budget Plan" to store your plan.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What's the difference between fixed and variable expenses?</AccordionTrigger>
                  <AccordionContent>
                    Fixed expenses are costs that stay the same each month (rent, insurance, subscriptions).
                    Variable expenses fluctuate monthly (groceries, entertainment, dining out). Separating them
                    helps you understand which expenses you can adjust to save more.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How do Smart Savings suggestions work?</AccordionTrigger>
                  <AccordionContent>
                    Smart Savings analyzes your budget data and provides personalized recommendations based on
                    your age and profession. These suggestions help you optimize your spending, identify saving
                    opportunities, and achieve your financial goals faster.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I save multiple budget plans?</AccordionTrigger>
                  <AccordionContent>
                    Yes! You can save multiple budget plans and switch between them. Each plan is automatically
                    saved in your browser's local storage. You can view all your saved plans in the Dashboard.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How is my remaining balance calculated?</AccordionTrigger>
                  <AccordionContent>
                    Your remaining balance is calculated by subtracting your total expenses (fixed + variable)
                    and your savings goal from your monthly income. This shows you how much discretionary
                    income you have left after all obligations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                  <AccordionContent>
                    Your financial data is stored locally in your browser and is never sent to external servers.
                    This ensures complete privacy and security of your information. However, clearing your
                    browser data will remove your saved plans.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>How do I read the budget visualization chart?</AccordionTrigger>
                  <AccordionContent>
                    The pie chart shows the breakdown of your monthly income allocation. Each segment represents
                    a category: fixed expenses (blue), variable expenses (green), savings (purple), and remaining
                    balance (orange). Hover over segments to see exact amounts and percentages.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I export or share my budget plans?</AccordionTrigger>
                  <AccordionContent>
                    Currently, budget plans are stored locally. You can take screenshots of your charts and
                    statistics to share. Future updates may include export functionality for PDF reports
                    and data backups.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>We're here to assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you couldn't find the answer you're looking for, feel free to reach out to our support team.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" asChild>
                  <a href="/documentation">
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Help;
