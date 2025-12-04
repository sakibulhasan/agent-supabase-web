/**
 * Sample Backend Server for Testing
 * 
 * This is a simple Express.js server that simulates the AI backend.
 * Run this with: node server-example.js
 * 
 * Install dependencies first: npm install express cors
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

// Sample responses for testing
const sampleResponses = [
  "I'm your RapidScale AI assistant. I can help you with data analysis, insights, and answering your questions.",
  "That's a great question! Based on the data, I would recommend focusing on scalability and performance optimization.",
  "I've analyzed your request and here are the key insights: Real-time processing is crucial for modern AI applications.",
  "Let me help you with that. The best approach would be to implement a microservices architecture for better scalability.",
  "Excellent! I can see you're interested in AI solutions. RapidScale offers enterprise-grade infrastructure with 99.9% uptime."
];

// Main endpoint
app.post('/ask', (req, res) => {
  const { question } = req.body;
  
  console.log('Received question:', question);
  
  // Simulate processing delay
  setTimeout(() => {
    // Return a random sample response or echo the question
    const response = {
      answer: question 
        ? `You asked: "${question}". ${sampleResponses[Math.floor(Math.random() * sampleResponses.length)]}`
        : sampleResponses[0]
    };
    
    res.json(response);
  }, 500); // 500ms delay to simulate processing
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', message: 'RapidScale AI Backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 POST endpoint: http://localhost:${PORT}/ask`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

/**
 * Example request using curl:
 * 
 * curl -X POST http://localhost:8080/ask \
 *   -H "Content-Type: application/json" \
 *   -d '{"question":"What is RapidScale AI?"}'
 */
