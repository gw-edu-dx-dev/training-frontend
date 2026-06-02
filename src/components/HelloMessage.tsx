import React, { useState } from 'react';
import { useHelloMessage } from '../hooks/useHelloMessage';

const HelloMessage: React.FC = () => {
  // State （入力中値預かり）
  const [nameInput, setNameInput] = useState('');
  
  // hook から state & 関数 を取得
  const { message, error, loading, getGreeting } = useHelloMessage();

  //送信ボタンを押す
  const handleSend = () => {
    //入力していない
    if (nameInput.trim() === '') {
      alert("名前を入力してください！");
      return;
    }

    //API を呼び出して挨拶メッセージを取得
    getGreeting(nameInput);
  };

  return (
    <div>
      <h2>挨拶 API テスト</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="text" 
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="名前を入力..."
          style={{ padding: '8px', marginRight: '5px' }}
        />
        <button 
          onClick={handleSend} 
          disabled={loading}
          style={{ padding: '8px 15px', cursor: 'pointer' }}
        >
          {loading ? '送信中...' : '送信'}
        </button>
      </div>
      
      <hr />      
      {error && <p style={{ color: 'red' }}>エラーが発生しました</p>}
      
      {message && (
        <div>
          <strong>{message}</strong>
        </div>
      )}
    </div>
  );
};

export default HelloMessage;