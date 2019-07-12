import Md from "react-markdown";
import { useRouter } from "next/router";
import { getPost, NextSFC } from "../../src/utils";
export interface PostProps extends post {}

export type post = {
  title: string;
  content: string;
  date: string;
  authors?: string[];
};

const Post: NextSFC<PostProps> = data => {
  const { content, title, date } = data;
  console.log(data);

  return (
    <div className="avenir">
      <h1>{title}</h1>
      <h3>{Date.parse(date) || "red"}</h3>
      <Md source={content} />
    </div>
  );
};

Post.getInitialProps = async ctx => {
  return { ...(await getPost(ctx.query)) };
};

export default Post;
export const PostL1: React.SFC<PostProps> = ({ content, title, date }) => {
  return (
    <div className="ba br3 pa2 ma2">
      <h3>{title}</h3>
      <h4>{date}</h4>
      <Md source={content.substring(0, 256)} />
    </div>
  );
};
