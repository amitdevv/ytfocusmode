// Simple API Key management utilities using browser native popups
// No UI interference, no layout issues!

export const setupApiKey = (onApiKeySet: (hasKey: boolean) => void) => {
  // Open Google AI Studio in new tab
  window.open('https://aistudio.google.com/app/apikey', '_blank');
  
  // Show simple browser prompt after a short delay
  setTimeout(() => {
    const userInput = window.prompt(
      'Gemini API Key Setup\n\n' +
      'Steps:\n' +
      '1. Get your API key from the opened tab\n' +
      '2. Copy your API key\n' +
      '3. Paste it below and click OK\n\n' +
      'Enter your Gemini API key:'
    );
    
    if (userInput && userInput.trim()) {
      // Save the API key
      localStorage.setItem('gemini_api_key', userInput.trim());
      onApiKeySet(true);
      
      // Show success message
      alert('✅ Success!\n\nAPI key saved successfully!\nYou can now generate AI-powered study notes.');
    } else if (userInput === '') {
      // User entered empty string
      alert('❌ Error\n\nPlease enter a valid API key.');
    }
    // If user clicked Cancel (userInput === null), do nothing
  }, 1500);
};

export const manageApiKey = (onApiKeySet: (hasKey: boolean) => void) => {
  const currentKey = localStorage.getItem('gemini_api_key');
  const maskedKey = currentKey ? `${currentKey.slice(0, 8)}...${currentKey.slice(-4)}` : 'None';
  
  const action = window.confirm(
    `API Key Management\n\n` +
    `Current API key: ${maskedKey}\n\n` +
    'Choose an action:\n' +
    '• OK = Update API key\n' +
    '• Cancel = Remove API key'
  );
  
  if (action) {
    // Update API key
    setupApiKey(onApiKeySet);
  } else {
    // Remove API key
    const confirmRemove = window.confirm(
      'Remove API Key\n\n' +
      'Are you sure you want to remove your API key?\n\n' +
      'You will not be able to generate study notes without it.'
    );
    if (confirmRemove) {
      localStorage.removeItem('gemini_api_key');
      onApiKeySet(false);
      alert('API key removed successfully.');
    }
  }
};