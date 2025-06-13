# Slogyn: React Frontend

**Slogyn** is a deployed React application that provides a user-friendly interface for generating brand slogans. The app connects to a backend API for slogan generation.

---

# Slogan Generator API: FastAPI Backend

The **Slogan Generator API** is a FastAPI based web service that powers the slogan generation for Slogyn. It uses a fine tuned, quantized GPT-2-medium language model to generate creative and unique brand slogans.

This web service is deployed on Google Cloud Run.

---

## Overview

- **Slogyn:** Deployed React app (frontend)
- **Slogan Generator API:** Live FastAPI backend (API)

---

## Features

### Slogyn (React Frontend)
- **User friendly interface**
- **Responsive UI**
- **Customizable slogan generation**
- **Multiple tone options**
- **Connected to the live Slogan Generator API**

### Slogan Generator API (FastAPI Backend)
- **RESTful API** for generating creative and unique brand slogans.
- **Multiple tones:** playful, bold, minimalist, luxury, classic
- **High-quality, quantized GPT-2 Medium model (~750MB)**
- **Parallel processing for faster results**
- **CORS enabled for frontend integration**
- **Model loaded once at startup for optimal performance**

---

## Usage

### Slogyn (React Frontend)
- **Live deployment:** The React app is already deployed and accessible at https://slogyn.vercel.app/
- **To integrate with your own React app:**  
  Use the API endpoint in your React code:
  
```
   const response = await fetch('https://slogan-generator-3-452522242685.us-central1.run.app', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
   brand: 'MyBrand',
   description: 'A great product',
   industry: 'Tech',
   tone: 'playful',
   num: 5
   })
   });
   const data = await response.json();
```


### Slogan Generator API (FastAPI Backend)
- **Model and API are already deployed and live at** https://slogan-generator-3-452522242685.us-central1.run.app

- #### **To make API requests:**
```
curl -X POST https://slogan-generator-3-452522242685.us-central1.run.app/ \
     -H "Content-Type: application/json" \
     -d '{
           "brand": "MyBrand",
           "description": "A great product",
           "industry": "Tech",
           "tone": "bold",
           "num": 5,
           "liked_slogan": "Think beyond limits"
         }'

```

---


## Dependencies

- **FastAPI**
- **Uvicorn**
- **Transformers**
- **Torch**
- **spaCy**

---

## License

MIT License

---

