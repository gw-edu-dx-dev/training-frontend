import React from 'react';

function App() {
  const[name, setName] = React.useState('');
  const[message, setMessage] = React.useState('');
  const[error, setError] = React.useState('');

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
    
    </div>
  );
}

export default App;
