import { BrowserRouter, Routes, Route,Link } from "react-router-dom"; 
import UserList from './components/UserList';
import NewUserForm from './components/NewUserForm';


function App() {

  return (
    <BrowserRouter>
      <header style={{padding: "8px",borderBottom: "1px solid #ccc"}}>
        <h1>ユーザー管理デモ</h1>
        <nav style={{display: "flex", gap: "8px"}}>
          <Link to="/">ユーザー一覧</Link>
          <Link to="/users/new">新規ユーザー登録</Link>
        </nav>
      </header>

      <main style={{padding:"16px"}}>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/new" element={<NewUserForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
