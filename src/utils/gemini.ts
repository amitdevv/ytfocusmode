import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from localStorage (user-provided)
const getUserApiKey = (): string | null => {
  return localStorage.getItem('gemini_api_key');
};

export const generateVideoSummary = async (videoInfo: string): Promise<string> => {
  try {
    // Get user's API key from localStorage
    const userApiKey = getUserApiKey();
    
    if (!userApiKey) {
      throw new Error('Gemini API key is not configured. Please add your API key in the settings.');
    }

    // Initialize Gemini with user's API key
    const genAI = new GoogleGenerativeAI(userApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Analyze this YouTube video content and extract the core ideas using first principles thinking. Identify and list the 10 most important concepts. Additionally, if the video includes any formulas, list them separately along with a clear explanation of their significance and how they work. Break down the content to its fundamental elements as if building the understanding from scratch.

Provide your response in the following structure:

1. Top 10 Important Concepts
   - List each concept with a brief explanation in simple, clear language.
2. Important Formulas (if any)
   - List each formula and provide a short explanation of its role and importance.

Here is the video information to analyze:

${videoInfo}

Format the response with clear headings and bullet points, avoiding any special characters or markdown symbols.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || "Unable to generate summary.";
  } catch (error: any) {
    console.error('Error generating summary:', error);
    
    // More specific error handling for user feedback
    if (error?.message?.includes('PERMISSION_DENIED') || error?.message?.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API key. Please check your API key in the settings and try again.');
    }
    if (error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API quota exceeded. Please try again later or check your usage limits.');
    }
    if (error?.message?.includes('QUOTA_EXCEEDED')) {
      throw new Error('Daily quota exceeded for your Gemini API key. Please try again tomorrow.');
    }
    if (!getUserApiKey()) {
      throw new Error('Gemini API key is missing. Please add your API key in the settings.');
    }
    
    // Generic fallback error
    throw new Error('Failed to generate video summary: ' + (error.message || 'Unknown error'));
  }
};