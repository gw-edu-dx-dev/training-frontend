import { useState } from 'react';

function App() {
    const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('http://localhost:8080/api/hello', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),// ← JSON にして送信
  });
  
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>名前を入力してください</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="名前を入力"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
