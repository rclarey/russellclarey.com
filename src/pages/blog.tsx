import * as React from "react";
import type { HeadFC } from "gatsby";

const Blog = () => {
  return (
    <main>
      <h1>Blog</h1>
      <div className="short-bio">
        <p>Nothing here yet, but I plan to write something soon.</p>
      </div>
    </main>
  );
};

export default Blog;

export const Head: HeadFC = () => <title>Blog | Russell Clarey</title>;
