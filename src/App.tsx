import HelloMessage from './components/HelloMessage';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import LoginForm from './components/LoginForm';
function App() {
  return (
    <><div style={{ display: 'none' }}>
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

    </div>

    {/**ログインフォーム */}
    <div>
      <LoginForm/>
    </div>
</>
  );
}

export default App;