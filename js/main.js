import { checkToken, redirect } from "./utils.js";
const form = document.forms[0];
(async function () {
  const hasToken = checkToken();
  if (hasToken == false) {
    redirect("/login.html");
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
});

function createPost() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const content = document.getElementById("content").value;
  const picture = document.getElementById("picture").value;
  const type = document.getElementById("type").value;

  const post = {
    title: title,
    author: author,
    content: content,
    picture: picture,
    date: new Date().toLocaleDateString(),
    type: type,
  };

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("content").value = "";
  document.getElementById("picture").value = "";
  document.getElementById("type").value = "";
  
  displayPosts();
}

function displayPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post_left");

    postDiv.innerHTML = `
      <div class="post">
        <div class="post_top">
          <div class="post_left">
            <div class="first">
              <div class="per">
                <img src="./assets/images/Ellipse 3.png" alt="" />
                <p>${post.author}</p>
              </div>
              <p>${post.date}</p>
            </div>
            <div class="second">
              <h2>${post.title}</h2>
              <p>
                ${post.content}
              </p>
            </div>
          </div>
          <div class="post_right">
            <img src="${post.picture}" alt="" />
          </div>
        </div>
        <div class="post_bottom">
          <div class="left">
            <button><p>${post.type}</p></button>
            <p>3 min read</p>
            <p>Selected for you</p>
          </div>
          <div class="right">
            <img src="./assets/icons/fluent_bookmark-add-20-regular.svg" alt="">
            <img src="./assets/icons/bi_three-dots.svg" alt="">
          </div>
        </div>
      </div>
      `;
    postList.appendChild(postDiv);
  });
}

const crt = document.getElementById("crt");
crt.onclick = createPost;
