export const fetchHelloMessage = async (): Promise<string> => {
  const response = await fetch('http://localhost:8080/api/hello');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};

export const fetchUsers = async () => {
  const response = await fetch('http://localhost:8080/api/users');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.json(); //戻りJSON [ {id: 1, name: "email"}, ... ]
};  

export const createUser = async (name: string, email: string, password: string) => {
  await fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
};

export const login = async (userId: string, password: string) => {
  const res = await fetch('http://localhost:8080/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, password }),
  });
  return res.text(); //return ok/NG
};
