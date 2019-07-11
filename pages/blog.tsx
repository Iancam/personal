import Post, { post } from "./Post";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export interface BlogProps {
  posts: post[];
}

type initialPropsParams = {
  pathname: string; // - path section of URL
  query: { id?: string }; // - query string section of URL parsed as an object
  asPath: string; // - String of the actual path(including the query) shows in the browser
  req: string; // - HTTP request object(server only)
  res: string; // - HTTP response object(server only)
  err: string; // - Error object if any error is encountered during the rendering)
};

interface NextSFC<T> extends React.SFC<T> {
  getInitialProps: (params: initialPropsParams) => any;
}

const Blog: NextSFC<BlogProps> = ({ posts }) => {
  return (
    <>
      {posts.map(p => (
        <Post {...p} />
      ))}
    </>
  );
};

Blog.getInitialProps = async ({ query }) => {
  const post = await import(`../posts/${query.id}.md`);
  const document = matter(post.default);
  return {
    ...document
  };
};

export default Blog;
