import { ExpenseItem } from "@/components/BudgetForm";

export interface Suggestion {
  type: "good" | "warning" | "danger";
  message: string;
}

export const generateSuggestions = (
  income: number,
  fixedExpenses: ExpenseItem[],
  variableExpenses: ExpenseItem[],
  savings: number
): Suggestion[] => {
  const suggestions: Suggestion[] = [];

  const totalFixed = fixedExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalVariable = variableExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalExpenses = totalFixed + totalVariable;

  const savingsPercent = (savings / income) * 100;
  const expensePercent = (totalExpenses / income) * 100;

  if (expensePercent > 70) {
    suggestions.push({
      type: "danger",
      message: "You are spending more than 70% of your income 🚨",
    });
  }

  const foodExpense = [...fixedExpenses, ...variableExpenses]
    .filter(e => (e.category || "").toLowerCase() === "food")
    .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  if ((foodExpense / income) * 100 > 30) {
    suggestions.push({
      type: "warning",
      message: "High spending on food 🍕 consider reducing it",
    });
  }

  if (savingsPercent >= 20) {
    suggestions.push({
      type: "good",
      message: "Great! You are saving more than 20% 💰",
    });
  }

  if (savingsPercent < 10) {
    suggestions.push({
      type: "warning",
      message: "Try to save at least 20% of your income",
    });
  }

  return suggestions;
};