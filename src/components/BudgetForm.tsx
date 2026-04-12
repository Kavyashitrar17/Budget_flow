import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categorizeExpense } from "@/services/aiServices";

// ✅ VALID CATEGORIES (MUST MATCH TRACKER)
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: ["food", "pizza", "restaurant", "cafe", "burger"],
  Transport: ["uber", "ola", "petrol", "travel"],
  Housing: ["rent", "house"],
  Utilities: ["electric", "water"],
  Entertainment: ["movie", "netflix"],
  Shopping: ["shopping", "clothes"],
  Health: ["doctor", "medicine"],
  Education: ["fees", "course"],
};

// ✅ Normalize AI category
const normalizeCategory = (raw: string, name: string): string => {
  const text = `${raw} ${name}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => text.includes(k))) return category;
  }

  return "Other";
};

export type ExpenseItem = {
  id: string;
  name: string;
  amount: number;
  category: string;   // ✅ REAL CATEGORY
  type: 'fixed' | 'variable'; // ✅ TYPE
};

type BudgetFormProps = {
  monthlyIncome: number;
  setMonthlyIncome: (value: number) => void;
  fixedExpenses: ExpenseItem[];
  setFixedExpenses: (value: ExpenseItem[]) => void;
  variableExpenses: ExpenseItem[];
  setVariableExpenses: (value: ExpenseItem[]) => void;
  savingsGoal: number;
  setSavingsGoal: (value: number) => void;
};

const BudgetForm: React.FC<BudgetFormProps> = ({
  monthlyIncome,
  setMonthlyIncome,
  fixedExpenses,
  setFixedExpenses,
  variableExpenses,
  setVariableExpenses,
  savingsGoal,
  setSavingsGoal,
}) => {
  const [savingsGoalPercentage, setSavingsGoalPercentage] = useState<number>(20);

  // 🔥 Calculations
  const totalFixedExpenses = fixedExpenses.reduce((s, i) => s + i.amount, 0);
  const totalVariableExpenses = variableExpenses.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = totalFixedExpenses + totalVariableExpenses;
  const remainingBalance = monthlyIncome - totalExpenses - savingsGoal;


 useEffect(() => {
  setSavingsGoal((monthlyIncome * savingsGoalPercentage) / 100);
}, [monthlyIncome, savingsGoalPercentage, setSavingsGoal]);

  // ✅ ADD ITEM
  const addExpenseItem = (type: 'fixed' | 'variable') => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      name: '',
      amount: 0,
      category: '',
      type,
    };

   if (type === 'fixed') {
  setFixedExpenses([...fixedExpenses, newItem]);
} else {
  setVariableExpenses([...variableExpenses, newItem]);
}
};

  // ✅ UPDATE ITEM
  const updateExpenseItem = async (
    id: string,
    field: 'name' | 'amount',
    value: string | number,
    type: 'fixed' | 'variable'
  ) => {
    const update = async (items: ExpenseItem[]) => {
      return Promise.all(
        items.map(async (item) => {
          if (item.id !== id) return item;

          if (field === "name") {
            const raw = await categorizeExpense(value as string);
            const category = normalizeCategory(raw, value as string);
            return { ...item, name: value as string, category };
          }

          return { ...item, amount: Number(value) || 0 };
        })
      );
    };

    if (type === 'fixed') {
      setFixedExpenses(await update(fixedExpenses));
    } else {
      setVariableExpenses(await update(variableExpenses));
    }
  };

  const removeExpenseItem = (id: string, type: 'fixed' | 'variable') => {
  if (type === 'fixed') {
    setFixedExpenses(fixedExpenses.filter(i => i.id !== id));
  } else {
    setVariableExpenses(variableExpenses.filter(i => i.id !== id));
  }
};

  // ✅ SAVE
  const saveBudgetPlan = () => {
    const data = {
      monthlyIncome,
      fixedExpenses,
      variableExpenses,
      savingsGoal,
    };

    localStorage.setItem('currentBudget', JSON.stringify(data));
    toast.success('Budget saved!');
  };
 

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget Planner</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Income */}
        <div>
          <Label>Monthly Income</Label>
          <Input
            type="number"
            value={monthlyIncome || ''}
            onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
          />
        </div>

        {/* Fixed */}
        <div>
          <Label>Fixed Expenses</Label>
          <Button onClick={() => addExpenseItem('fixed')}>+ Add</Button>

          {fixedExpenses.map((e) => (
            <div key={e.id} className="flex gap-2 mt-2">
              <Input
                placeholder="Name"
                value={e.name}
                onChange={(ev) =>
                  updateExpenseItem(e.id, 'name', ev.target.value, 'fixed')
                }
              />

              <Input
                type="number"
                value={e.amount}
                onChange={(ev) =>
                  updateExpenseItem(e.id, 'amount', ev.target.value, 'fixed')
                }
              />

              <Button onClick={() => removeExpenseItem(e.id, 'fixed')}>
                <Trash2 size={16} />
              </Button>

              {e.category && <span className="text-xs">{e.category}</span>}
            </div>
          ))}
        </div>

        {/* Variable */}
        <div>
          <Label>Variable Expenses</Label>
          <Button onClick={() => addExpenseItem('variable')}>+ Add</Button>

          {variableExpenses.map((e) => (
            <div key={e.id} className="flex gap-2 mt-2">
              <Input
                placeholder="Name"
                value={e.name}
                onChange={(ev) =>
                  updateExpenseItem(e.id, 'name', ev.target.value, 'variable')
                }
              />

              <Input
                type="number"
                value={e.amount}
                onChange={(ev) =>
                  updateExpenseItem(e.id, 'amount', ev.target.value, 'variable')
                }
              />

              <Button onClick={() => removeExpenseItem(e.id, 'variable')}>
                <Trash2 size={16} />
              </Button>

              {e.category && <span className="text-xs">{e.category}</span>}
            </div>
          ))}
        </div>

        {/* Savings */}
        <Slider
          value={[savingsGoalPercentage]}
          onValueChange={(v) => setSavingsGoalPercentage(v[0])}
          max={50}
        />

        <div>
          Remaining:{" "}
          <span className={cn(remainingBalance < 0 ? "text-red-500" : "text-green-500")}>
            ₹{remainingBalance}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={saveBudgetPlan} className="w-full">
          Save Budget
        </Button>
      </CardFooter>
    </Card>
  );
};



export default BudgetForm;