export const fetchHelloMessage = async (): Promise<string> => {
  const response = await fetch('http://localhost:8080/api/hello');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};

export const fetchGreeting = async (name: string): Promise<string> => {
  const response = await fetch(
    `http://localhost:8080/api/hello?name=${encodeURIComponent(name)}`
  );
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};
