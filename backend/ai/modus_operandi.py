import tensorflow as tf
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC

# Dummy dataset for modus operandi detection
data = [
    {"text": "The suspect entered through the window and stole jewelry.", "label": "burglary"},
    {"text": "The suspect snatched a purse from a pedestrian.", "label": "theft"},
]

# Feature extraction
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform([item["text"] for item in data])
y = [item["label"] for item in data]

# Train a simple SVM model
model = SVC(kernel="linear")
model.fit(X, y)

# Save the model
import joblib
joblib.dump(model, "modus_operandi_model.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")

# Inference function
def detect_modus_operandi(text):
    vectorizer = joblib.load("tfidf_vectorizer.pkl")
    model = joblib.load("modus_operandi_model.pkl")
    X = vectorizer.transform([text])
    return model.predict(X)[0]
