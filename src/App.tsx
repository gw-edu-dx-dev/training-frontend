import HelloMessage from './components/HelloMessage';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
function App() {
  return (
    <>
    <div>
      <h1>React + Spring Boot連携</h1>
      <HelloMessage />
    </div>
    
    {/**ユーザー一覧 */}
    <div>
    <UserList/>
    </div>

    {/**新規登録フォーム */}
    <div>
    <UserForm/>
    </div>
</>
  );
}

export default App;
