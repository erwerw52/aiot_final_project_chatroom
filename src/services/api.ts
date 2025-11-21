// Mock API service
export const sendMessageToWebhook = async (message: string): Promise<string> => {
  // 模擬延遲
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock response
  return `您說：${message}。這是從 Webhook 模擬的回應。`;
};