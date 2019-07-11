export interface PostProps extends post {}

export type post = {
  title: string;
  content: string;
  date: string;
  authors: string[];
};

const Post: React.SFC<PostProps> = ({ content, data: { title, date } }) => {
  return (
    <div className="avenir">
      <h1>{title}</h1>
      <h3>{Date.parse(date)}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Post;
