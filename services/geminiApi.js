// Google Gemini API Integration for ThriveMum Assistant
// Provides personalized financial advice for moms
import { GEMINI_API_KEY, GEMINI_API_URL } from '@env';

// IMPORTANT: Configure your API key in the .env file
// Get your free API key from https://makersuite.google.com/app/apikey

// System context to make responses specific to ThriveMum app
const SYSTEM_CONTEXT = `You are a financial assistant for ThriveMum, an app helping busy moms in the US/UK save money and grow their finances. 

Your role:
- Give SPECIFIC, actionable advice with exact numbers and steps
- Focus on: grocery savings, batch cooking, home DIY, emergency funds, beginner investing
- Use a warm, supportive tone - like a helpful friend
- Keep responses under 80 words
- Mention ThriveMum features when relevant (Smart Shopping, Batch Cooking Planner, DIY Calculator, Investment Guide)

Examples of good responses:
- "Check the Smart Shopping feature - Aldi is 22% cheaper than Whole Foods right now. For a family of 4, that's $40-60 saved weekly!"
- "Start with $20/week in emergency fund. Use ThriveMum's tracker. In 6 months you'll have $520 - that's 1 month of groceries covered."
- "Try the Batch Cooking Planner - prep Sunday's chicken for 3 meals. Saves $167/week vs takeout for family of 4."

Keep it practical, specific, and encouraging.`;

/**
 * Send a message to Google Gemini API and get a specific, actionable response
 * @param {string} userMessage - The user's question
 * @param {Array} conversationHistory - Previous messages for context (optional)
 * @returns {Promise<string>} - The assistant's response
 */
export const getGeminiResponse = async (userMessage, conversationHistory = []) => {
  try {
    // Build the prompt with context
    const fullPrompt = `${SYSTEM_CONTEXT}

Previous conversation:
${conversationHistory.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n')}

User: ${userMessage}

Assistant (give specific, actionable advice with numbers):`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback responses if API fails
    const fallbackResponses = {
      grocery: 'Check the Smart Shopping screen - compare 5 stores with live prices. Aldi typically saves $40-60/week for a family of 4. Shop Wednesday mornings for extra 15% markdowns!',
      save: 'Start small: $20/week = $1,040/year. Set up auto-transfer on payday. Build 3-month emergency fund first ($1,500-2,000), then start investing.',
      invest: 'Once you have 3 months expenses saved, start investing $50-100/month in low-cost index funds (like Vanguard Total Stock Market). Check our Investment Guide for step-by-step setup.',
      cook: 'Use Batch Cooking Planner - prep Sunday, eat all week. Family of 4 saves $167/week ($8,684/year) vs takeout. Takes just 3 hours Sunday!',
      diy: 'Interior painting DIY: $120 vs $850 pro = $730 saved. Takes 1 weekend. Check Home Savings Calculator for 10 projects that save $3,000+/year.',
      default: 'I can help with grocery savings, batch cooking, home DIY, budgeting, and investing. What area interests you most?'
    };
    
    const lower = userMessage.toLowerCase();
    if (lower.includes('grocery') || lower.includes('shop')) return fallbackResponses.grocery;
    if (lower.includes('cook') || lower.includes('meal')) return fallbackResponses.cook;
    if (lower.includes('diy') || lower.includes('home')) return fallbackResponses.diy;
    if (lower.includes('invest')) return fallbackResponses.invest;
    if (lower.includes('save') || lower.includes('saving')) return fallbackResponses.save;
    
    return fallbackResponses.default;
  }
};

/**
 * Get quick suggestions for common questions
 */
export const getQuickSuggestions = () => {
  return [
    "How can I save on groceries?",
    "Help me start investing",
    "Best DIY home projects?",
    "Build emergency fund fast",
    "Batch cooking tips"
  ];
};
