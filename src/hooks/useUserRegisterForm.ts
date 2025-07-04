import { useState } from 'react';

type user = {
  name: string;
  email: string;
};

export const useUserRegisterForm = (initialValues: user) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 入力値変更時の処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 入力チェック
  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!values.name) newErrors.name = "名前は必須です";
    if (!values.email) newErrors.email = "メールアドレスは必須です";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "無効なメール形式です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, validate };
};