import React from "react";
import { categoryColor } from "./styles";

export default function TagRow({ tags }) {
  return (
    <div className="tags-container">
      {tags.map((tag, ind) => {
        return (
          <span
            key={ind}
            className="tag"
            style={{ backgroundColor: categoryColor[tag] }}
          >
            {tag.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
}
