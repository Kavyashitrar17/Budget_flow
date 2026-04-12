from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Training data
texts = ["pizza", "burger", "uber", "bus", "movie", "netflix", "rent", "electricity"]
labels = ["Food", "Food", "Transport", "Transport", "Entertainment", "Entertainment", "Housing", "Utilities"]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

model = MultinomialNB()
model.fit(X, labels)

class ExpenseInput(BaseModel):
    text: str

@app.post("/categorize")
def categorize_expense(data: ExpenseInput):
    X_test = vectorizer.transform([data.text])
    prediction = model.predict(X_test)
    return {"category": prediction[0]}