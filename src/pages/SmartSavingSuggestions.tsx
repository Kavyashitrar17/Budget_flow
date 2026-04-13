import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import SuggestionCard from '@/components/SuggestionCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, BrainCircuit, TrendingUp } from 'lucide-react';
import { AgeRange, Profession, getSuggestionsByAgeAndProfession, getRandomNotification } from '@/utils/savingsSuggestions';

type BudgetData = {
  monthlyIncome: number;
  fixedExpenses: { name: string; amount: number; category: string }[];
  variableExpenses: { name: string; amount: number; category: string }[];
  savingsGoal: number;
};

type Suggestion = {
  title: string;
  description: string;
  icon: 'piggy' | 'bulb' | 'trend';
  gradientClass: string;
};

type GoalType = "reduce" | "save" | "control";

// 🔥 AI ENGINE (UPGRADED)
const getSuggestionsFromBudget = (
  budget: BudgetData,
  goal: GoalType
): { suggestions: Suggestion[]; insight: string } => {

  const { monthlyIncome, fixedExpenses, variableExpenses } = budget;
  const all = [...fixedExpenses, ...variableExpenses];

  const totalExpenses = all.reduce((sum, e) => sum + e.amount, 0);

  const pct = (amount: number) =>
    monthlyIncome > 0 ? Math.round((amount / monthlyIncome) * 100) : 0;

  const categoryTotal = (keywords: string[]) =>
    all
      .filter((e) =>
        keywords.some(
          (k) =>
            e.category?.toLowerCase().includes(k) ||
            e.name?.toLowerCase().includes(k)
        )
      )
      .reduce((sum, e) => sum + e.amount, 0);

  const food = categoryTotal(["food", "pizza", "restaurant"]);
  const transport = categoryTotal(["transport", "uber", "fuel"]);
  const entertainment = categoryTotal(["entertainment", "netflix", "movie"]);

  const categories = [
    { name: "Food", amount: food },
    { name: "Transport", amount: transport },
    { name: "Entertainment", amount: entertainment },
  ];

  const top = categories.reduce((a, b) => (a.amount > b.amount ? a : b));

  const percent = pct(top.amount);
  const potentialSaving = Math.round(top.amount * 0.3);

  // 🔥 INSIGHT (UPGRADED)
  const insight = monthlyIncome === 0
    ? "Add your income in Budget Planner to unlock insights."
    : `⚠️ You are spending ₹${top.amount} (${percent}%) on ${top.name}. You can save approx ₹${potentialSaving}/month by optimizing this category.`;

  const suggestions: Suggestion[] = [];

  // 🔥 GOAL BASED LOGIC
  if (goal === "reduce") {
    suggestions.push({
      title: `Reduce ${top.name} Spending`,
      description: `Cut down unnecessary ${top.name.toLowerCase()} expenses to save ₹${potentialSaving}/month.`,
      icon: "bulb",
      gradientClass: "from-rose-50 to-orange-50",
    });
  }

  if (goal === "save") {
    suggestions.push({
      title: "Increase Savings",
      description: "Try 50/30/20 rule and automate savings.",
      icon: "trend",
      gradientClass: "from-green-50 to-emerald-50",
    });
  }

  if (goal === "control") {
    suggestions.push({
      title: "Control Spending",
      description: "Set strict category limits and track weekly.",
      icon: "trend",
      gradientClass: "from-blue-50 to-cyan-50",
    });
  }

  // Common suggestions
  suggestions.push(
    {
      title: "Weekly Budgeting",
      description: "Divide your expenses weekly to track better.",
      icon: "bulb",
      gradientClass: "from-yellow-50 to-orange-50",
    },
    {
      title: "Emergency Fund",
      description: "Save 3–6 months of expenses for safety.",
      icon: "piggy",
      gradientClass: "from-green-50 to-teal-50",
    }
  );

  return { suggestions, insight };
};

const SmartSavingSuggestions = () => {
  const { toast } = useToast();

  const [ageRange, setAgeRange] = useState<AgeRange>('18-25');
  const [profession, setProfession] = useState<Profession>('Student');
  const [goal, setGoal] = useState<GoalType>("reduce");

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [insight, setInsight] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savingsPreferences');
    if (saved) {
      const { ageRange, profession } = JSON.parse(saved);
      setAgeRange(ageRange);
      setProfession(profession);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savingsPreferences', JSON.stringify({ ageRange, profession }));
  }, [ageRange, profession]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const n = getRandomNotification();
      toast({ title: n.title, description: n.description });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleGetSuggestions = () => {
    setIsLoading(true);

    setTimeout(() => {
      const profile = getSuggestionsByAgeAndProfession(ageRange, profession);

      let budgetSuggestions: Suggestion[] = [];
      let insightText = "";

      const raw = localStorage.getItem("currentBudget");

      if (raw) {
        const budget: BudgetData = JSON.parse(raw);
        const result = getSuggestionsFromBudget(budget, goal);
        budgetSuggestions = result.suggestions;
        insightText = result.insight;
      }

      setInsight(insightText);
      setSuggestions([...budgetSuggestions, ...profile].slice(0, 8));

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <BrainCircuit /> Smart Saving Insights
        </h1>

        <p className="text-muted-foreground mb-6">
          AI-powered insights for students & early professionals
        </p>

        <Card className="mb-6">
          <CardContent className="grid md:grid-cols-3 gap-4 p-6">

            <Select value={ageRange} onValueChange={(v) => setAgeRange(v as AgeRange)}>
              <SelectTrigger><SelectValue placeholder="Age" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="18-25">18–25</SelectItem>
                <SelectItem value="26-35">26–35</SelectItem>
              </SelectContent>
            </Select>

            <Select value={profession} onValueChange={(v) => setProfession(v as Profession)}>
              <SelectTrigger><SelectValue placeholder="Profession" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Salaried Employee">Employee</SelectItem>
              </SelectContent>
            </Select>

            <Select value={goal} onValueChange={(v) => setGoal(v as GoalType)}>
              <SelectTrigger><SelectValue placeholder="Goal" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="reduce"> Reduce Spending</SelectItem>
                <SelectItem value="save">Increase Savings</SelectItem>
                <SelectItem value="control"> Control Budget</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleGetSuggestions} className="col-span-3">
              {isLoading ? "Analyzing..." : "Get Smart Suggestions"}
            </Button>

          </CardContent>
        </Card>

        {/* 🔥 Insight */}
        {insight && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6 flex gap-2">
            <TrendingUp className="text-blue-600" />
            <p className="text-sm">{insight}</p>
          </div>
        )}

        {/* Suggestions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestions.map((s, i) => (
            <SuggestionCard key={i} {...s} />
          ))}
        </div>

      </main>
    </div>
  );
};

export default SmartSavingSuggestions;
