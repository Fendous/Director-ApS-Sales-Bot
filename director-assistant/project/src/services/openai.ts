// This is a mock service for OpenAI API
// In a real application, you would use the actual OpenAI API

import { Message, FileAttachment } from '../types';

// Mock delay to simulate API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessageToOpenAI(
  messages: Message[],
  attachments: FileAttachment[]
): Promise<string> {
  // Simulate API delay
  await delay(1000 + Math.random() * 2000);
  
  // Get the last user message
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  
  if (!lastUserMessage) {
    return "I didn't receive a message. How can I help you with sales today?";
  }
  
  const userMessage = lastUserMessage.content.toLowerCase();
  
  // Check if there are file attachments
  if (attachments.length > 0) {
    return `I've received ${attachments.length} file(s). In a production environment, I would analyze these files and provide insights based on their content. For now, I can see you've uploaded ${attachments.map(a => a.name).join(', ')}. How would you like me to help with these files?`;
  }
  
  // Simple response logic based on keywords
  if (userMessage.includes('hello') || userMessage.includes('hi') || userMessage.includes('hey')) {
    return "Hello! I'm your Director Apps Sales AI Assistant. How can I help you today?";
  }
  
  if (userMessage.includes('sales') || userMessage.includes('sell')) {
    return "I can help with various sales-related tasks such as lead qualification, sales strategy, pricing information, and competitive analysis. What specific sales assistance do you need?";
  }
  
  if (userMessage.includes('product') || userMessage.includes('service')) {
    return "Our products and services are designed to help businesses optimize their operations and increase revenue. Would you like me to provide more specific information about any particular product or service?";
  }
  
  if (userMessage.includes('price') || userMessage.includes('cost') || userMessage.includes('pricing')) {
    return "Our pricing is structured to provide maximum value while remaining competitive in the market. For detailed pricing information, I would need to know which specific product or service you're interested in.";
  }
  
  if (userMessage.includes('competitor') || userMessage.includes('competition')) {
    return "We continuously monitor the competitive landscape to ensure our offerings remain cutting-edge. Our key differentiators include superior customer service, innovative features, and a strong focus on ROI for our clients.";
  }
  
  if (userMessage.includes('lead') || userMessage.includes('prospect')) {
    return "Effective lead management is crucial for sales success. I can help you qualify leads, develop outreach strategies, and track conversion metrics. What aspect of lead management are you focusing on?";
  }
  
  if (userMessage.includes('thank')) {
    return "You're welcome! Is there anything else I can help you with regarding your sales inquiries?";
  }
  
  // Default response
  return "I'm your Sales AI Assistant, ready to help with any sales-related questions or tasks. I can provide information on products, pricing, competitive analysis, lead qualification, and sales strategies. How can I assist you today?";
}