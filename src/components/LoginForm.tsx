import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginFormData, LoginResponse } from "../types/Login";

function LoginForm() {
  const [form, setForm] = useState<LoginFormData>({
    id: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      id: value === "" ? "" : Number(value),
    }));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (form.id === "" || form.password === "") {
      setError("IDとパスワードを入力してください");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: form.id,
          password: form.password,
        }),
      });

      if (!response.ok) {
        throw new Error("ログインAPI呼び出しに失敗しました");
      }

      const data: LoginResponse = await response.json();

      if (data.success) {
        setMessage(data.message);
        // ログイン成功なら一覧画面へ
        navigate("/users");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("ログイン処理でエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            ユーザーID：
            <input
              type="number"
              value={form.id}
              onChange={handleChangeId}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>
            パスワード：
            <input
              type="password"
              value={form.password}
              onChange={handleChangePassword}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>

        <button type="submit" disabled={loading} style={{ padding: "8px 16px" }}>
          {loading ? "認証中..." : "ログイン"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: 16 }}>
          {error}
        </p>
      )}
      {message && (
        <p style={{ color: "green", marginTop: 16 }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default LoginForm;
