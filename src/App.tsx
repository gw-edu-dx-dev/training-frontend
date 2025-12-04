import HelloMessage from './components/HelloMessage';
import{useState} from "react";
import type{FormEvent} from "react";

function App() {
  // 入力中の名前
  const[name, setName] = useState("");
  //サーバーから帰ってきたメッセージ
  const[message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();  //画面のリロードを防ぐ

    if(!name){
      alert("名前を入力してください");
      return;
    }

    try{
      const response = await fetch(
      `http://localhost:8080/api/greeting?name=${encodeURIComponent(name)}`
      );
      const text = await response.text();
      setMessage(text);
    }catch(error){
      console.error("API呼び出しでエラーが発生しました", error);
      setMessage("エラーが発生しました…");
    }
  }

  return (
    <div>
      <h1>React + Spring Boot連携</h1>
      <HelloMessage />
    
      <h1>名前を入力してください</h1>
      <form onSubmit={handleSubmit}>
        <div >
          <label>
            名前：
            <input type="text" 
             value={name} 
             onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">
          送信
        </button>
      </form>

      {message && (
        <p>{message}</p>
      )}
    </div>
  );
}

export default App;
