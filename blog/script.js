const blogPostsDiv = document.getElementById("blog-posts");
let blogPost;
let blogTitle;
let blogMessages;
let blogDate;

function addBlogPost(title, messages, date) {
  blogPost = document.createElement("div");
  blogPost.classList.add("blog-post", "blog-in-anim");

  blogTitle = document.createElement("h2");
  blogTitle.classList.add("title");
  blogTitle.innerHTML = title;

  blogMessages = document.createElement("p");
  if (typeof(blogMessages) == "string") {
    blogMessages.innerHTML += messages.replaceAll("\\n", "<br>");
  } else {
    for (var i = 0; i < messages.length; i++) {
      blogMessages.innerHTML += messages[i];
      blogMessages.innerHTML += "<br>";
    }
  }

  blogDate = document.createElement("h4");
  blogDate.classList.add("date");
  blogDate.innerHTML = date;

  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogMessages);
  blogPost.appendChild(blogDate);
  blogPostsDiv.appendChild(blogPost);
}

addBlogPost("Bruh", ["Among us", "sussy baka", "inwaeoidoin"], "02-10-2022");
addBlogPost("Bruh", "I eat pasta \n everyday", "02-10-2022");  // TODO: fix this!!
