// サンプル
export const fetchHelloMessage = async (): Promise<string> => {
  const response = await fetch('http://localhost:8080/api/hello');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.text();
};

// Training 3
type user = {
  id: number;
  name: string;
  email: string;
};

export const fetchUsersList = async (): Promise<user[]> => {
  const response = await fetch('http://localhost:8080/api/user/list');
  if (!response.ok) throw new Error('API呼び出し失敗');
  return response.json();
};

// Training 4
type RegisterUser = {
  name: string;
  email: string;
};

export const fetchUserRegister = async (user: RegisterUser) => {
  const response = await fetch('http://localhost:8080/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('API呼び出し失敗');
};
