import React from "react";

const links = [
  {
    title: "About Me",
    src: "https://www.linkedin.com/in/huynh-phat-loi-926495194/",
  },
  { title: "Contact Me", src: "https://www.facebook.com/huynh.phatloi.5/" },
  { title: "Login", src: "/login" },
  { title: "Blog", src: "/blog" },
  { title: "Home", src: "/home" },
];
const languages = ["HTML", "CSS", "SCSS", "JavaScript", "ReactJS"];

export default function Footer() {
  return (
    <div className="footer">
      <div className="row">
        <div className="about">
          <h5>ABOUT ME</h5>
          <div>
            I am a student at the University of Education of Ho Chi Minh City,
            majoring in Informatics Education. But I realized that I was not
            suitable for the educational environment. Because i like intended to
            participate in developing a certain web product, so I decided to
            turn to a programmer. Hope to receive help from everyone
          </div>
        </div>
        <div className="categories">
          <h5>CATEGORIES</h5>
          <ul>
            {links.map((link, keyy) => {
              return (
                <li key={keyy}>
                  <a href={link.src}>{link.title}</a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="quicklinks">
          <h5>LANGUAGES</h5>
          <ul>
            {languages.map((link, key) => {
              return <li key={key}>{link}</li>;
            })}
          </ul>
        </div>
      </div>
      <hr />
      <div className="bottom">
        <p className="copyright-text">
          Copyright &copy; 2020 All Rights Reserved by
          <em style={{ color: "blue" }}> Huỳnh Phát Lợi</em>.
        </p>
      </div>
    </div>
  );
}
