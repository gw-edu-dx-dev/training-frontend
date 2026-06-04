import React from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = React.useState<User[]>([]);

  //非同期処理をasync/awaitで行っている
  React.useEffect(() => {
    const getUsers = async () => {
      const respose = await fetch('http://localhost:8080/api/users');
      const data = await respose.json();
      setUsers(data);
    };

    getUsers();
  },[]);//引数に空配列を渡すことで、初回レンダリングのときだけ実行される

  return (
    <>
      <h1>User一覧画面</h1>

      <ul>
        {/* usersをmap関数でループして、ユーザーの情報を表示する */}
        {users.map((user) => (
          //idをkeyとして、ユーザーの名前とメールアドレスを表示する
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </>
  );
}
 export default App;