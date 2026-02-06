import React, {useState} from 'react';
import { createUser } from '../services/api';


// ユーザー登録フォームコンポーネント
const UserForm: React.FC = () => {
    // 入力値の状態管理
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // 登録処理
    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();

        // 入力チェック
        if (!name.trim() || !email.trim()){
            alert("名前とメールアドレスを入力してください");
            return;

        }

        try{
            // ユーザー作成API呼び出し
            const result = await createUser(name, email);
            setMessage(result);

            // 入力欄をリセッ
            setName('');
            setEmail('');

        }catch (error){
            setMessage("エラー発生しました。");
        }
    };

    return (
        <div>
            <h3>新規ユーザー登録</h3>
            {/*登録フォーム*/}
            <form onSubmit= {handleRegister}>
                <div>
                    <input
                    type="text"
                    placeholder='名前'
                    value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                    type="text"
                    placeholder='メール'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">登録</button>
            </form>

            {/*結果message */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserForm;