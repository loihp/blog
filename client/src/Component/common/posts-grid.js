import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import TagRow from "./tag-row";

export default function PostGrid({ posts }) {
  const [pageSize, setPageSize] = useState(8);
  const [current, setCurrent] = useState(1);
  const paginationPosts = useMemo(() => {
    const lastIndex = current * pageSize;
    const firstIndex = lastIndex - pageSize;
    return posts.slice(firstIndex, lastIndex);
    // eslint-disable-next-line
  }, [current, pageSize]);

  useEffect(() => {
    window.scroll({
      top: 50,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <section className="grid-pagination-container">
      <section className="post-grid container">
        {paginationPosts.map((post, index) => {
          return (
            <div className="post-container" key={index}>
              <figure>
                <Link to={post.link}>
                  <img
                    src={require(`../../assets/images/${post.image}`).default}
                    alt={post.image}
                  />
                </Link>
              </figure>
              <TagRow tags={post.categories} />
              <h2>{post.title}</h2>
              <p className="author-text">
                <span>
                  By:
                  <Link to={`/authors/${post.author}`}>{post.author}</Link>
                </span>
                <span> - {post.date}</span>
              </p>
              <p className="description-text">{post.description}</p>
              <Link to={post.link}>Read more ...</Link>
            </div>
          );
        })}
      </section>
      <Pagination
        simple
        showSizeChanger
        onShowSizeChange={setPageSize}
        pageSize={pageSize}
        total={posts.length}
        defaultCurrent={current}
        onChange={setCurrent}
      />
    </section>
  );
}
