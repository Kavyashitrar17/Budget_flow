import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { categorizeExpense } from "@/services/aiServices";

// ✅ CATEGORY MAP
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: ["food", "pizza", "restaurant", "cafe", "burger"],
  Transport: ["uber", "ola", "petrol", "travel","auto","transport","Transport","richshaw","bus","train"],
  Housing: ["rent", "house"],
  Utilities: ["electric", "water"],
  Entertainment: ["movie", "netflix","spotify", "entertainment,TV","tv","music"],
  Shopping: ["shopping", "clothes"],
  Health: ["doctor", "medicine"],
  Education: ["fees", "course"],
};

const normalizeCategory = (
  raw: string,
  name: string,
  type?: "fixed" | "variable"
): string => {
  if (type === "fixed") return "Fixed"; // 🔥 FORCE FIX

  const text = `${raw} ${name}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => text.includes(k))) return category;
  }

  return "Other";
};

export type ExpenseItem = {
  id: string;
  name: string;
  amount: number;
  category: string;
  type: "fixed" | "variable";
};

type BudgetFormProps = {
  monthlyIncome: number;
  setMonthlyIncome: (value: number) => void;
  // FIX 1: Accept functional updater pattern used throughout the component
  fixedExpenses: ExpenseItem[];
  setFixedExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
  variableExpenses: ExpenseItem[];
  setVariableExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
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
  const [percentage, setPercentage] = useState(20);

  // 🔥 calculations
  const totalFixed = fixedExpenses.reduce((s, i) => s + i.amount, 0);
  const totalVariable = variableExpenses.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = totalFixed + totalVariable;
  const remaining = monthlyIncome - totalExpenses - savingsGoal;

  useEffect(() => {
    setSavingsGoal((monthlyIncome * percentage) / 100);
  }, [monthlyIncome, percentage, setSavingsGoal]);

  // voice
  const startVoice = (cb: (text: string) => void) => {
    const SpeechRecognitionClass =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).SpeechRecognition ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert("Voice not supported");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "en-IN";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      cb(text);
    };

    recognition.start();
  };

  // ➕ add
  const addItem = (type: "fixed" | "variable") => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      name: "",
      amount: 0,
      category: "",
      type,
    };

    if (type === "fixed") {
      setFixedExpenses((prev) => [...prev, newItem]);
    } else {
      setVariableExpenses((prev) => [...prev, newItem]);
    }
  };

  // ❌ remove
  const removeItem = (id: string, type: "fixed" | "variable") => {
    if (type === "fixed") {
      setFixedExpenses((prev) => prev.filter((i) => i.id !== id));
    } else {
      setVariableExpenses((prev) => prev.filter((i) => i.id !== id));
    }
  };

  // FIX 3: Helper to categorize and patch a single item by id
  const applyCategory = async (
    id: string,
    name: string,
    type: "fixed" | "variable",
    setter: React.Dispatch<React.SetStateAction<ExpenseItem[]>>
  ) => {
    if (!name) return;
    let category = "Other";
    try {
      const raw = await categorizeExpense(name);
      category = normalizeCategory(raw, name, type);
    } catch (error) {
      console.log("Category detection failed", error);
    }
    setter((prev) =>
      prev.map((item) => (item.id === id ? { ...item, category } : item))
    );
  };

  // 💾 save
  const saveBudget = () => {
  const newPlan = {
    monthlyIncome,
    fixedExpenses,
    variableExpenses,
    savingsGoal,
    savingsGoalPercentage: percentage,
    date: new Date().toISOString().slice(0, 7),
  };

  const existingPlans = JSON.parse(localStorage.getItem("budgetPlans") || "[]");

  localStorage.setItem(
    "budgetPlans",
    JSON.stringify([...existingPlans, newPlan])
  );

  localStorage.setItem("currentBudget", JSON.stringify(newPlan));

  toast.success("Budget saved!");
};

  return (
    <Card className="max-w-5xl mx-auto shadow-md border-0">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
           Monthly Budget Planner
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* income */}
        <div>
          <Label className="mb-1 block">Monthly Income</Label>
          <div className="flex items-center gap-2">
            <Input
              className="h-10"
              type="number"
              value={monthlyIncome || ""}
              onChange={(e) =>
                setMonthlyIncome(Number(e.target.value) || 0)
              }
            />
            <Button
              size="icon"
              className="h-10 w-10 bg-purple-400 hover:bg-purple-500 text-white"
              onClick={() =>
                startVoice((text) => {
                  const num = text.replace(/\D/g, "");
                  setMonthlyIncome(Number(num));
                })
              }
            >
              🎤
            </Button>
          </div>
        </div>

        {/* fixed */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <Label className="font-medium"> Fixed Expenses</Label>

            <div className="flex gap-2">
              <Button
                size="icon"
                className="h-10 w-10 bg-purple-400 text-white"
                onClick={() =>
                  startVoice(async (text) => {
                    const parts = text.trim().split(" ");
                    const amount = Number(parts.pop());
                    const name = parts.join(" ");

                    if (!name || isNaN(amount)) return;

       const category = "Fixed";
                    setFixedExpenses((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        name,
                        amount,
                        category,
                        type: "fixed",
                      },
                    ]);
                  })
                }
              >
                🎤
              </Button>

              <Button
                size="icon"
                className="h-10 w-10 bg-purple-400 text-white"
                onClick={() => addItem("fixed")}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {fixedExpenses.map((e) => (
            <div key={e.id} className="grid grid-cols-12 gap-2 mt-2 items-center">

              {/* name */}
              <Input
                className="col-span-5 h-10"
                value={e.name}
                onChange={(ev) => {
                  const value = ev.target.value;
                  setFixedExpenses((prev) =>
                    prev.map((item) =>
                      item.id === e.id ? { ...item, name: value } : item
                    )
                  );
                }}
                onBlur={(ev) => applyCategory(e.id, ev.target.value, "fixed", setFixedExpenses)}
              />

              {/* amount — FIX 2: show empty string instead of 0 */}
              <Input
                className="col-span-3 h-10"
                type="number"
                value={e.amount || ""}
                onChange={(ev) => {
                  const value = Number(ev.target.value) || 0;
                  setFixedExpenses((prev) =>
                    prev.map((item) =>
                      item.id === e.id ? { ...item, amount: value } : item
                    )
                  );
                }}
              />

              <Button
                size="icon"
                className="col-span-1"
                onClick={() => removeItem(e.id, "fixed")}
              >
                <Trash2 size={16} />
              </Button>

              {e.category && (
                <span className="col-span-2 text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {e.category}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* variable */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <Label className="font-medium">Variable Expenses</Label>

            <div className="flex gap-2">
              <Button
                size="icon"
                className="h-10 w-10 bg-purple-400 text-white"
                onClick={() =>
                  startVoice(async (text) => {
                    const parts = text.trim().split(" ");
                    const amount = Number(parts.pop());
                    const name = parts.join(" ");

                    if (!name || isNaN(amount)) return;

                    // FIX 3: Categorize voice-added variable items
                    let category = "Other";
                    try {
                      const raw = await categorizeExpense(name);
                      category = normalizeCategory(raw, name,"variable");
                    } catch (error) {
                      console.log("Category detection failed", error);
                    }

                    setVariableExpenses((prev) => [
                      ...prev,
                      {
                        id: Date.now().toString(),
                        name,
                        amount,
                        category,
                        type: "variable",
                      },
                    ]);
                  })
                }
              >
                🎤
              </Button>

              <Button
                size="icon"
                className="h-10 w-10 bg-purple-400 text-white"
                onClick={() => addItem("variable")}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>

          {variableExpenses.map((e) => (
            <div key={e.id} className="grid grid-cols-12 gap-2 mt-2 items-center">

              {/* name */}
              <Input
                className="col-span-5 h-10"
                value={e.name}
                onChange={(ev) => {
                  const value = ev.target.value;
                  setVariableExpenses((prev) =>
                    prev.map((item) =>
                      item.id === e.id ? { ...item, name: value } : item
                    )
                  );
                }}
                onBlur={(ev) => applyCategory(e.id, ev.target.value, "variable", setVariableExpenses)}
              />

              {/* amount — FIX 2: show empty string instead of 0 */}
              <Input
                className="col-span-3 h-10"
                type="number"
                value={e.amount || ""}
                onChange={(ev) => {
                  const value = Number(ev.target.value) || 0;
                  setVariableExpenses((prev) =>
                    prev.map((item) =>
                      item.id === e.id ? { ...item, amount: value } : item
                    )
                  );
                }}
              />

              <Button
                size="icon"
                className="col-span-1"
                onClick={() => removeItem(e.id, "variable")}
              >
                <Trash2 size={16} />
              </Button>

              {e.category && (
                <span className="col-span-2 text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                  {e.category}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* savings */}
        <div className="space-y-2">
          <Label>Savings Goal ({percentage}%)</Label>
          <Slider
            value={[percentage]}
            onValueChange={(v) => setPercentage(v[0])}
            max={50}
          />
          <p className="text-sm text-muted-foreground">
            ₹{Number(savingsGoal.toFixed(0)).toLocaleString("en-IN")} will be saved
          </p>
        </div>

        {/* totals */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border space-y-2">
          <p>Total Expenses: ₹{Number(totalExpenses).toLocaleString("en-IN")}</p>
          <p>Savings: ₹{savingsGoal}</p>
          <p className={remaining < 0 ? "text-red-500" : "text-green-600"}>
            Remaining: ₹{remaining}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={saveBudget} className="w-full bg-purple-600">
          Save Budget
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BudgetForm;