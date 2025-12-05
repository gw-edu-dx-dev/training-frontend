import HelloMessage from './components/HelloMessage';
import UserList from './components/UserList';
// 2つのコンポーネントをAppでまとめて表示する


function App() {

  return (
    <div>
      <h1>React + Spring Boot連携</h1>
      <HelloMessage />
    
      {/* 区切り線 */}
      <hr /> 

      {/* ユーザー一覧を表示する画面 */}
      <UserList />
    </div>
  );
}

export default App;
