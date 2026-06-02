export const fetchHelloMessage = async (name: string): Promise<string> => {
  const response = await fetch(`http://localhost:8080/api/hello?name=${name}`);
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.json(); //戻りJSON [ {id: 1, name: "email"}, ... ]
};  