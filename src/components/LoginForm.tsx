import React, { useState } from 'react';
import { login } from '../services/api';

const LoginForm: React.FC = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [status, setStatus] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(id, pw); // API呼び出しDBチェック
        if (result === "OK") {
            setStatus("こんにちは " + id + " ログイン成功!");
        } else {
            setStatus("IDもしくパスワードが間違っています!");
        }
    };

    return (
        <div>
            <h3>簡易ログイン </h3>
            <form onSubmit={handleLogin}>
                <div>
                    <input placeholder="ID (Name)" 
                    value={id} onChange={e => setId(e.target.value)} /></div>
                <div>
                    <input type="password" 
                    placeholder="Password" 
                    value={pw} 
                    onChange={e => setPw(e.target.value)} />
                </div>
                <button type="submit">ログイン</button>
            </form>
            <p>{status}</p>
        </div>
    );
};
export default LoginForm;