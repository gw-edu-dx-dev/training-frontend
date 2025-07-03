import { useUserRegisterForm } from '../hooks/useUserRegisterForm';
import { fetchUserRegister } from '../services/api';

const UserRegisterForm = () => {
  const { values, errors, handleChange, validate } = useUserRegisterForm({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        await fetchUserRegister(values)
        alert("ユーザー登録が完了しました");
      } catch (err) {
        alert("登録に失敗しました");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>名前</label>
        <input type="text" name="name" value={values.name} onChange={handleChange} />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>
      <div>
        <label>メールアドレス</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <button type="submit">登録</button>
    </form>
  );
};

export default UserRegisterForm;
