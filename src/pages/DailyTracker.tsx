/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { categorizeExpense } from "@/services/aiServices";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

type Expense = {
  id: number;
  name: string;
  amount: number;
  category: string;
  date: string;
};

type BudgetItem = {
  id?: number;
  category: string;
  amount: number;
};

type Budget = {
  monthlyIncome?: number;
  fixedExpenses: BudgetItem[];
  variableExpenses: BudgetItem[];
};

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Food: ["food", "pizza", "restaurant", "cafe", "burger", "meal"],
  Transport: ["uber", "ola", "bus", "train", "metro", "petrol", "fuel"],
  Housing: ["rent", "house"],
  Utilities: ["electric", "water", "internet"],
  Entertainment: ["movie", "netflix", "game"],
  Shopping: ["shopping", "clothes"],
  Health: ["doctor", "medicine"],
  Education: ["fees", "course"],
};

const normalizeCategory = (raw: string, name: string): string => {
  const text = `${raw} ${name}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((k) => text.includes(k))) {
      return category;
    }
  }

  return "Other";
};

const DailyTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [budget, setBudget] = useState<Budget | null>(null);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // ✅ LOAD BUDGET (FIXED)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("currentBudget");
      if (!raw) return;
      setBudget(JSON.parse(raw));
    } catch (err) {
      console.error(err);
    }
  }, []);

  // ✅ SAVE EXPENSES
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // ✅ CLEAN MATCH (FINAL)
  const getCategoryBudget = (category: string): number => {
    if (!budget) return 0;

    const all = [
      ...(budget.fixedExpenses || []),
      ...(budget.variableExpenses || []),
    ];

    return all
      .filter((b) => b.category === category)
      .reduce((sum, b) => sum + b.amount, 0);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;

    const parts = input.split(" ");
    const name = parts[0];
    const amount = Number(parts[1]) || 0;

    const raw = await categorizeExpense(name);
    const category = normalizeCategory(raw, name);

    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };
  // 🎤 VOICE INPUT
const startVoiceInput = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = async (event: any) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    console.log("Voice:", transcript);

    // 🔥 Extract amount (first number found)
    const amountMatch = transcript.match(/\d+/);
    const amount = amountMatch ? Number(amountMatch[0]) : 0;

    // 🔥 Remove common words
    const cleaned = transcript
      .replace(/\d+/g, "")
      .replace(/spent|pay|paid|for|on|rs|rupees/g, "")
      .trim();

    const name = cleaned.trim() || "expense";
    // 🔥 AI Category
    const raw = await categorizeExpense(name);
    const category = normalizeCategory(raw, name);

    const newExpense: Expense = {
      id: Date.now(),
      name,
      amount,
      category,
      date: new Date().toLocaleDateString(),
    };

    setExpenses((prev) => [...prev, newExpense]);
  };
};
// 📥 DOWNLOAD CSV
const downloadReport = () => {
  const rows = [
    ["Name", "Amount", "Category", "Date"],
    ...expenses.map((e) => [e.name, e.amount, e.category, e.date]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "expenses.csv";
  a.click();
};

  const groupedByDate = expenses.reduce((acc: any, exp) => {
    if (!acc[exp.date]) acc[exp.date] = [];
    acc[exp.date].push(exp);
    return acc;
  }, {});

  const groupByCategory = (items: Expense[]) => {
    return items.reduce((acc: any, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  };
const generateInsights = () => {
  if (!budget || expenses.length === 0) return [];

  const insights: string[] = [];

  // 🔥 Group expenses by category
  const categoryTotals: Record<string, number> = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  // 🔥 Compare with budget
  Object.entries(categoryTotals).forEach(([category, spent]) => {
    const budgetAmt = getCategoryBudget(category);

    if (budgetAmt === 0) return;

    const percent = (spent / budgetAmt) * 100;

    if (percent > 100) {
      insights.push(
        `⚠️ You exceeded ${category} budget by ₹${spent - budgetAmt}`
      );
    } else if (percent > 70) {
      insights.push(
        `⚠️ You used ${percent.toFixed(0)}% of ${category} budget`
      );
    } else if (percent < 40) {
      insights.push(
        `💡 You are saving well in ${category}`
      );
    }
  });

  // 🔥 Overall savings check
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);

  if (budget.monthlyIncome) {
    const savings = budget.monthlyIncome - totalSpent;

    if (savings < 0) {
      insights.push(`🚨 You are overspending overall`);
    } else if (savings > budget.monthlyIncome * 0.2) {
      insights.push(`🔥 Great savings this month!`);
    }
  }

  return insights;
};
const insights = generateInsights();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Daily Expense Tracker</h1>

        <div className="flex gap-2 mb-4">
  <input
    className="border p-2 w-full"
    placeholder="pizza 500"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />

  <button
    onClick={handleAdd}
    className="bg-purple-600 text-white px-4"
  >
    Add
  </button>

  {/* 🎤 VOICE */}
  <button
    onClick={startVoiceInput}
    className="bg-green-500 text-white px-4"
  >
    🎤
  </button>
</div>

{/* 📥 DOWNLOAD BUTTON */}
<button
  onClick={downloadReport}
  className="bg-blue-500 text-white px-4 py-2 mb-4"
>
  Download Report
</button>
{insights.length > 0 && (
  <div className="mb-4 p-3 bg-yellow-50 border rounded">
    <h2 className="font-semibold mb-2">AI Insights</h2>

    {insights.map((msg, i) => (
      <div key={i} className="text-sm">
        {msg}
      </div>
    ))}
  </div>
)}

        <div className="space-y-4">
          {Object.entries(groupedByDate).map(([date, items]: any) => {
            const grouped = groupByCategory(items);

            return (
              <div key={date} className="p-4 bg-gray-100 rounded">
                <h2 className="font-bold">{date}</h2>

                {Object.entries(grouped).map(([category, exps]: any) => {
                  const total = exps.reduce(
                    (sum: number, e: Expense) => sum + e.amount,
                    0
                  );

                  const budgetAmt = getCategoryBudget(category);
                  const remaining = budgetAmt - total;

                  return (
                    <div key={category} className="mt-3">
                      <h3 className="text-purple-700 font-semibold">
                        {category}
                      </h3>

                      {exps.map((e: Expense) => (
                        <div key={e.id} className="flex justify-between ml-3">
                          <span>{e.name}</span>
                          <span>₹{e.amount}</span>
                        </div>
                      ))}

                      <div className="ml-3 text-sm">
                        <div>Total: ₹{total}</div>

                        {budgetAmt > 0 ? (
                          <>
                            <div>Budget: ₹{total} / ₹{budgetAmt}</div>
                            <div
                              className={
                                remaining < 0
                                  ? "text-red-500"
                                  : "text-green-600"
                              }
                            >
                              Remaining: ₹{remaining}
                            </div>
                          </>
                        ) : (
                          <div className="text-gray-400">
                            No budget set
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;