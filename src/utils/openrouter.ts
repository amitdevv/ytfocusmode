const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const generateVideoSummary = async (videoInfo: string): Promise<string> => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash-preview-05-20",
        "messages": [
          {
            "role": "system",
            "content": "You are an expert at analyzing YouTube video content. Create concise, informative summaries focusing on the main topics and key points."
          },
          {
            "role": "user",
            "content": `Analyze this YouTube video content and extract the core ideas using first principles thinking. Identify and list the 10 most important concepts. Additionally, if the video includes any formulas, list them separately along with a clear explanation of their significance and how they work. Break down the content to its fundamental elements as if building the understanding from scratch.

Here is the video information to analyze:

${videoInfo}

Format the response with clear bullet points, avoiding any special characters or markdown symbols.`
          }
        ]
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate summary');
    }

    const data = await response.json();
    return data.choices[0].message.content || "Unable to generate summary.";
  } catch (error) {
    console.error('Error generating summary:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate video summary: ${error.message}`);
    }
    throw new Error('Failed to generate video summary');
  }
};