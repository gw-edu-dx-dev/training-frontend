import { useState } from 'react';
import { fetchGreeting } from './services/api';

function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      setError('名前を入力してください');
      setMessage('');
      return;
    }

    setError('');
    try {
      setMessage(await fetchGreeting(name.trim()));
    } catch {
      setMessage('');
      setError('通信に失敗しました');
    }
  };

  return (
    <div>
      <h3>名前呼び出し</h3>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">送信</button>
      </form>

      {error && <p>{error}</p>}
      <p>{message}</p>
    </div>
  );
}

export default App;
