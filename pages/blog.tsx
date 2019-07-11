import Post, { post } from "./Post";
import matter from "grey-matter";
import ReactMarkdown from "react-markdown";

type entry = {
  title: string;
  author: string;
  date: Date;
  comments?: comment[];
  anchor?: number; //used to place entry within the context of parent content
  featured: boolean;
};

type comment = entry;

type blogData = {
  entries: entry[];
};

function compose(fxs: ((t: any) => any)[]) {
  return fxs.reduce((prevFn, nextFn) => value => nextFn(prevFn(value)));
}

/**
 * the 'anchor' and 'featured' attributes are data that contain a UX dimension.
 * Said another way, they are imaginary points in the UX space, and real points in the business space
 *
 */

/**
 * should we allow arbitrary functional tagging of groups?
 * doing so allows for domain creep from upper and lower layers, but also allows us
 * to provide domain specific abstractions to be resolved by lower level domain logic
 * probabalistically weighted state transitions might be an underlying representation for
 * this, but writing such things by hand is hard.
 */

/** as in any physical domain, energy is lost across boundaries. When light strikes water, most makes it through, but some is lost as
 * heat, and some is reflected back. In our domain, that cost is paid by the developer. My job will be to discern which information
 *
 */

// toUX

// toUI
type leafSelector<T> =
  | ((t: T /* of the dataType or its subsets*/) => string)
  | string;

type toUXMapper<T, S extends keyof T, X extends keyof T> = {
  [x: string]: leafSelector<S> | UX;
};

type UX = { [s: string]: string[] | string | UX };
//entryPoint = 0? 0: key

const entryMapper = [["title", "author", "date"], ["content", "comments"]];

const entriesMapper = {};

const blogMapper = {
  0: "c:title", // 0 tells you this is the initial element, which will be the entry point for a state transition.
  "c:latest": ({ entries }: blogData) =>
    entries.sort((a, b) => a.date.getDate() - b.date.getDate()),
  "c:featured": ({ entries }: blogData) =>
    entries.filter(entry => entry.featured)
};

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
