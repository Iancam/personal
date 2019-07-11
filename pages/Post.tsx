export interface PostProps extends post {}

export type post = {
  title: string;
  content: string;
  time: Date;
};

const Post: React.SFC<PostProps> = ({ title, content, time }) => {
  return (
    <div className="avenir">
      <h1>{title}</h1>
      <h3>{time.toString()}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Post;
