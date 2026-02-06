import { useState, useEffect, useCallback } from "react";

// ユーザー情報の型定義
type User = {
    id: number;
    name: string;
     email: string;
};

// ユーザー一覧を取得するカスタムフック
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

      // ユーザー一覧取得
    const loadData = useCallback(async () => {
        setLoading(true);
        try {
        const response = await fetch("http://localhost:8080/api/users");
        if (!response.ok) throw new Error("ユーザー一覧の取得に失敗");
        const data: User[] = await response.json();
        setUsers(data);
        } catch (err) {
        setError("ユーザー一覧の取得でエラーが発生");
        } finally {
        setLoading(false);
        }
    }, []);

    
    // 初回レンダリング時にデータ取得
    useEffect(() => {
        loadData();
    }, [loadData]);

    // 状態と再取得用関数を返す
    return { users, loading, error, refresh: loadData }; 
};