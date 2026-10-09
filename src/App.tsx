import React from 'react';

type User = {
  id: number;
  name: string;
};

function App() {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [users, setUsers] = React.useState<User[]>([]);
  const [registerName, setRegisterName] = React.useState('');
  const [loginId, setLoginId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [registerMessage, setRegisterMessage] = React.useState('');
  const [loginUserId, setLoginUserId] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('');

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

     if (name.trim() === '') {
    setError('名前を入力してください');
    setMessage('');
    return;
  }

  setError('');

    const response = await fetch(
      `http://localhost:8080/api/hello?name=${name}`
    );

    const text = await response.text();
    setMessage(text);
  };
    const getusers = async () => {
      const response = await fetch(
        'http://localhost:8080/api/users'
      );

      const data: User[] = await response.json();
      setUsers(data);
    };

  const registerUser = async () => {
    if (
      registerName.trim() === '' || 
      loginId.trim() === '' || 
      password.trim() === ''
    ) {
      setRegisterMessage('すべてのフィールドを入力してください');
      return;
    }
    const response = await fetch(
      'http://localhost:8080/api/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

      body: JSON.stringify({
        name: registerName,
        loginId: loginId,
        password: password,
      })
    }
  );
  const text = await response.text();
  setRegisterMessage(text);
  };
  
  const loginUser = async () => {
    if (loginUserId.trim() === '' || loginPassword.trim() === '') {
      setLoginMessage('ログインIDとパスワードを入力してください');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginId: loginUserId,
          password: loginPassword,
        }),
      });

      const text = await response.text();
      setLoginMessage(text);
    } catch {
      setLoginMessage('サーバーに接続できませんでした');
    }
  };

    return (
    <div>
      <h3>名前呼び出し</h3>
      <form onSubmit={handlesubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>

      {error && <p>{error}</p>}

      <p>{message}</p>
      <h3>ユーザー一覧</h3>
      <button onClick={getusers}>ユーザー一覧を取得
      </button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID: {user.id} 名前: {user.name}
          </li>
        ))}
      </ul>
        <h3>新規ユーザー登録</h3>
      <form>
        <div>
          <label>名前:</label>
          <input
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />
        </div>
        <div>
          <label>ログインID:</label>
          <input
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          /> 
        </div>

        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={registerUser}>登録</button>
      </form>
      <p>{registerMessage}</p>
      
      <h3>ログイン</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}>
        <div>
          <label>ログインID:</label>
          <input
            value={loginUserId}
            onChange={(e) => setLoginUserId(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button type="submit">ログイン</button>
      </form>
      <p>{loginMessage}</p>

    </div>
  );
}

export default App;
