import { BrowserRouter, Routes, Route,Link, Navigate } from "react-router-dom"; 
import UserList from './components/UserList';
import NewUserForm from './components/NewUserForm';
import LoginForm from './components/LoginForm';


function App() {

  return (
    <BrowserRouter>
      <header style={{padding: "8px",borderBottom: "1px solid #ccc"}}>
        <h1>ユーザー管理デモ</h1>
        <nav style={{display: "flex", gap: "8px"}}>
          {/* リンク先 */}
          <Link to="/users">ユーザー一覧</Link>
          <Link to="/users/new">新規ユーザー登録</Link>
          <Link to="/login">ログイン</Link>
        </nav>
      </header>

      <main style={{padding:"16px"}}>
        <Routes>
        {/* ロードしたらログイン画面に遷移 */}
          <Route path="/" element={<Navigate to="/login" replace/>}/>

          {/*URLとリンクを紐づける  */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<NewUserForm />} />
          <Route path="/login" element={<LoginForm/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
