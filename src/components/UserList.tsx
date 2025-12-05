import {useEffect, useState} from "react";

type User = {
    id : number;
    name: String;
    email: String;
};

function UserList(){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/users");
            if(!response.ok){
                throw new Error("ユーザー一覧の取得に失敗しました");
            }
            const data: User[] = await response.json();
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
            <h2>ユーザー一覧</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名前</th>
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