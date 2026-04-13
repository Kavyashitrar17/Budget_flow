# Smart Personal Finance Tracker

## Overview

Smart Personal Finance Tracker is a web-based application designed to help users manage their finances effectively. The system allows users to plan budgets, track daily expenses, and receive intelligent financial insights based on their spending patterns.

The application is primarily designed for students and early professionals (ages 18–30) who are beginning to manage their own income and expenses.

---

## Features

### 1. Budget Planner
- Create a monthly budget based on income
- Add fixed and variable expenses
- Set savings goals using a slider
- Visualize budget distribution using charts
- Automatically calculates remaining balance

### 2. Daily Expense Tracker
- Track expenses on a daily basis
- Categorize expenses automatically using AI-based logic
- View expenses grouped by date and category
- Delete and manage entries easily
- Supports voice input for adding expenses
- Displays category-wise spending vs budget

### 3. Smart Saving Suggestions
- Provides personalized financial suggestions
- Analyzes real user budget data
- Detects highest spending category automatically
- Allows users to select financial goals:
  - Reduce spending
  - Increase savings
  - Control budget
- Generates actionable insights based on spending patterns
- Combines profile-based and budget-based suggestions

### 4. Dashboard
- Displays monthly financial summary
- Shows income, expenses, and savings
- Stores and retrieves previous budget plans

### 5. User Personalization
- Save user name locally
- Customize suggestions based on:
  - Age group
  - Profession

---

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite

### Styling
- Tailwind CSS
- shadcn/ui components

### State Management
- React Hooks

### Data Storage
- LocalStorage (for persistence)

### Charts and Visualization
- Recharts

### AI Logic
- Rule-based intelligent system for:
  - Expense categorization
  - Financial insights
  - Smart suggestions

---

## Project Structure
src/
│
├── components/              
│   ├── ui/                  
│   ├── common/              
│   │   ├── Navbar.tsx
│   │   ├── SuggestionCard.tsx
│
├── features/               
│   ├── budget/
│   │   ├── BudgetForm.tsx
│   │   ├── BudgetChart.tsx
│   │   ├── budgetUtils.ts
│
│   ├── tracker/
│   │   ├── DailyTracker.tsx
│   │   ├── trackerUtils.ts
│
│   ├── smartSavings/
│   │   ├── SmartSavingSuggestions.tsx
│   │   ├── suggestionEngine.ts   
│
│   ├── dashboard/
│   │   ├── Dashboard.tsx
│
├── hooks/                   
│   ├── useLocalStorage.ts
│
├── services/                
│   ├── aiServices.ts
│
├── utils/                 
│   ├── format.ts
│
├── types/                  
│   ├── budget.ts
│   ├── suggestion.ts
│
├── App.tsx
├── main.tsx
---

## How It Works

1. User enters income and expenses in the Budget Planner
2. Data is stored in localStorage
3. Daily expenses are tracked and categorized
4. Smart Suggestions module:
   - Reads stored budget data
   - Calculates category-wise spending
   - Detects highest expense category
   - Generates insights and recommendations

---

## Installation and Setup

1. Clone the repository
   git clone https://github.com/Kavyashitrar17/Budget_flow.git
2. Navigate to project directory
   cd project-folder
3. Install dependencies
   npm install
4. Run the development server
   npm run dev

---

## Future Enhancements

- Integration with real AI/ML models
- Backend support with database
- User authentication system
- Expense analytics with graphs
- Weekly and monthly financial reports
- Notifications for overspending

---

## Conclusion

This project demonstrates a complete personal finance management system with intelligent suggestions and real-time tracking. It focuses on solving real-world financial problems for young individuals entering financial independence.

---

