export const fetchHelloMessage = async (): Promise<string> => {
  const response = await fetch('http://localhost:8080/api/hello');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};
