import {useEffect, useState} from "react";  
import { Link } from "react-router-dom";
//ReactからuseState（状態管理）とuseEffect(副作用処理)を取り出している
// これにより、コンポーネント内で「値の保存」や「画面表示後のデータ取得」ができる

//SpringBootから帰ってくるJSONの形に合わせてUser型を定義している
type User = { 
    id : number;
    name: string;
    email: string;
};

//Reactの関数コンポーネント
function UserList(){ 
    //状態管理
    const [users, setUsers] = useState<User[]>([]); //ユーザー一覧（初期値は空）
    const [loading, setLoading] = useState(true); //データ取得中はtrue、終わったらfalse
    const [error, setError] = useState<String | null>(null); //エラーが起きたらエラーメッセージをセットするための状態

    //userEffectで画面表示された瞬間にAPIをたたく
    useEffect(() => { 
        const fetchUsers = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/users");
            if(!response.ok){
                throw new Error("ユーザー一覧の取得に失敗しました");
            }
            //JSONをパースしてUser[]として受け取りusersにセットする
            const data: User[] = await response.json();
            setUsers(data);
        }catch(err){
            console.error(err);
            setError("ユーザー一覧の取得でエラーが発生しました");
        }finally{
            setLoading(false);
        }
    };
    
    //useEffectの実行（初回表示の1回だけ動く）
    fetchUsers(); 
    },[]);

    if(loading){
        return <p>読み込み中です</p>
    }

    if(error){
        return (
            <div>
                <p>{error}</p>
                <Link to="/users/new">新規ユーザー登録へ</Link>
            </div>
        );
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
                    {users.map((user)=> ( //mapで繰り返し表示
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

export default UserList; //他のファイルで使えるようにする