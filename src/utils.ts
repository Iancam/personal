import matter from "gray-matter";
/**
 * @todo handle pagination
 */
export const getPosts = async () => {
  const ctx = await require.context(`../posts`, true, /\.md$/);

  const keys = ctx.keys();
  const values = keys.map(ctx) as { default: string }[];

  const data = keys.map((key, index) => {
    // Create slug from filename
    const slug = key
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".");
    const value = values[index].default;

    // Parse document
    const document = matter(value);

    return {
      document,
      slug
    };
  });
  console.log(data);

  return data;
};

export const getPost = async (query: any) => {
  const post = await import(`../posts/${query.slug}.md`);
  const document = matter(post.default);

  const data = document.data as {
    title: string;
    date: string;
    authors?: string[];
  };
  return {
    ...document,
    ...data
  };
};

export type initialPropsParams = {
  pathname: string; // - path section of URL
  query: { id?: string }; // - query string section of URL parsed as an object
  asPath: string; // - String of the actual path(including the query) shows in the browser
  req: string; // - HTTP request object(server only)
  res: string; // - HTTP response object(server only)
  err: string; // - Error object if any error is encountered during the rendering)
};

export interface NextSFC<T> extends React.SFC<T> {
  getInitialProps: (params: initialPropsParams) => any;
}
