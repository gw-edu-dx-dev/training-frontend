import { useHelloMessage } from '../hooks/useHelloMessage';

const HelloMessage = () => {
  const { message, error } = useHelloMessage();

  if (error) return <p>エラーが発生しました</p>;
  if (!message) return <p>読み込み中...</p>;

  return <p>{message}</p>;
};

export default HelloMessage;
