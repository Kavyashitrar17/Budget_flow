export const categorizeExpense = async (text: string) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/categorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    return data.category;
  } catch (error) {
    console.error("AI Error:", error);
    return "Unknown";
  }
};