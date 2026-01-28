// src/components/NewUserForm.tsx
import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

type NewUserFormData = {
  name: string;
  email: string;
  password: string;
};

type NewUserResponse = {
  id: number;
  name: string;
  email: string; 
  password: string;
};

function NewUserForm() {
  const [form, setForm] = useState<NewUserFormData>({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // フロント側のバリデーション
  const validate = (): { name?: string; email?: string } => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = "名前は必須です";
    }

    if (!form.email.trim()) {
      newErrors.email = "メールアドレスは必須です";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "メールアドレスの形式が正しくありません";
      }
    }

    if (!form.password.trim()) {
      newErrors.password = "パスワードは必須です";
    }
    return newErrors;
  };

  // 送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // 200以外が発生した場合
      if (!response.ok) {
        throw new Error("ユーザー登録に失敗しました");
      }

      const data: NewUserResponse = await response.json();

      setMessage(`ユーザー「${data.name}」(ID:${data.id})を登録しました`);
      // フォームをクリア
      setForm({ name: "", email: "" ,password: ""});
    } catch (error) {
      console.error(error);
      setMessage("エラーが発生しました。もう一度お試しください。");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>新規ユーザー登録</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            名前：
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>

        <div>
          <label>
            メールアドレス：
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        <div>
          <label>
            パスワード：
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
          {errors.password && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "送信中…" : "登録"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p style={{ marginTop: "8px" }}>
        <Link to="/">ユーザー一覧に戻る</Link>
      </p>
    </div>
  );
}

export default NewUserForm;
