
import {useEffect, useState} from "react";

// ユーザー情報の型定義
type User = {
    id : number;
    name: String;
    email: String;
};

function UserList(){
    // ユーザーリストを保持するstate
    const [users, setUsers] = useState<User[]>([]);
    // データ取得中かどうかを管理
    const [loading, setLoading] = useState(true);
    //エラー情報を保持
    const [error, setError] = useState<String | null>(null);

    
    // コンポーネントマウント時に一度だけユーザー一覧を取得
    useEffect(() => {
        const fetchUsers = async () => {
        try{
            // APIからユーザー一覧を取得
            const response = await fetch("http://localhost:8080/api/users");
            // レスポンスが正常でなければエラーを投げる
            if(!response.ok){
                throw new Error("ユーザー一覧の取得に失敗しました");
            }
            // JSONデータをUser型として取得
            const data: User[] = await response.json();
            // stateにユーザー一覧をセット
            setUsers(data);

        }catch(err){
            console.error(err);
            setError("ユーザー一覧の取得でエラーが発生しました");
        
        }finally{
            setLoading(false);
        }
    };
    fetchUsers();
    },[]);

    if(loading){
        return <p>読み込み中です</p>
    }

    if(error){
        return <p> {error}</p>
    }

    return(
        <div>
            <h3>ユーザー一覧</h3>
            <table className = "users_table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>氏名</th>
                        <th>メールアドレス</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=> (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;