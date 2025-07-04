import { useUsersList } from '../hooks/useUsersList';

const UsersList = () => {
   const { users, error } = useUsersList();
   
   if (error) return <p>エラーが発生しました</p>;
   if (!users) return <p>読み込み中...</p>;

   return (
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            名前： {user.name}　メールアドレス： {user.email}
          </li>
        ))}
      </ol>
   );
};

export default UsersList;
