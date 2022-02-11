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

    for (var i = 0; i < messages.length; i++) {
      blogMessages.innerHTML += messages[i];
      blogMessages.innerHTML += "<br>";
    }

  blogDate = document.createElement("h4");
  blogDate.classList.add("date");
  blogDate.innerHTML = date;

  blogPost.appendChild(blogTitle);
  blogPost.appendChild(blogMessages);
  blogPost.appendChild(blogDate);
  blogPostsDiv.appendChild(blogPost);
}

addBlogPost("reporting 1", ["I am on a bus right now,", "it\'s the bus I am on goes back to where I live.", "The problem is that I live in a place"], "02-11-2022");
addBlogPost("conversation 1", ["I said: What do you want me to put on my blog?", "He said: mmmMMmmmm..."], "02-11-2022");
addBlogPost("pasta person", ['I eat pasta', 'at least once', 'every week', '(it\'s a lot of pasta)'], "02-10-2022");
