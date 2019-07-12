import Post, { post, PostL1 } from "./post";
import Navigation from "../../src/components/Navigation";
import _Head from "../../src/components/_Head";

import matter from "gray-matter";
// import ReactMarkdown from "react-markdown";
import { getPosts, NextSFC } from "../../src/utils";
import Link from "next/link";

export interface BlogProps {
  posts: {
    document: matter.GrayMatterFile<string>;
    slug: string;
  }[];
}

const Blog: NextSFC<BlogProps> = ({ posts }) => {
  return (
    <>
      <_Head name={"The Blog of Ian Campbell"} />
      <div className="avenir fw2">
        <Navigation />
        <div className="mt5">
          {posts.map((p, i) => {
            const data = p.document.data as {
              title: string;
              date: string;
              authors?: string[];
            };
            const post = { content: p.document.content, ...data };

            return (
              <Link href={`/blog/post?slug=${p.slug}`} key={p.slug}>
                <a className="link">
                  <PostL1 {...post} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

Blog.getInitialProps = async ctx => {
  return { posts: await getPosts() };
};

export default Blog;
