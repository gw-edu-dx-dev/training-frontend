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

//task4 API 新規登録
//task5 SQL にデータを送る
export const createUser = async (name: string, email: string): Promise<string> =>{
  const response = await fetch('http://localhost:8080/api/users',{
    method: "POST",
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({name, email}),
  });
  if (!response.ok) throw new Error("登録エラー発生")
    return response.text();

};