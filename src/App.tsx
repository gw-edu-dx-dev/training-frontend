import React from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [users, setUsers] = React.useState<User[]>([]);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (name.trim() === '') {
  setError('名前を入力してください');
  return;
}

    const response = await fetch(
      'http://localhost:8080/api/users',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      }
    )
  const data = await response.text();

  setError('');
  setMessage(data);
  };
  
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
<h1>ユーザー登録画面</h1>
      <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          登録
          </button>
      </form>


      <p>{error}</p>
      <p>{message}</p>


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