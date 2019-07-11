import Post, { post } from "./Post";
// import Navigation from "../src/components/Navigation";
import matter from "gray-matter";
// import ReactMarkdown from "react-markdown";
import { getPosts } from "../src/utils";

export interface BlogProps {
  posts: {
    document: matter.GrayMatterFile<string>;
    slug: string;
  }[];
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
  console.log(posts);

  return (
    <>
      {posts.map((p, i) => (
        <Post {...p.document} key={i} />
      ))}
    </>
  );
};

Blog.getInitialProps = async ctx => {
  return { posts: await getPosts() };
};

export default Blog;
