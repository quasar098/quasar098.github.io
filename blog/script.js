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

addBlogPost("the truely", ["I truely", "truly", "trully", "feel cold"], "05-31-2022");
addBlogPost("donkey bonga", ["konkey donk", "64 ", "nintendont", "take this away from me"], "05-27-2022")
addBlogPost("lunch", ["I play minecraft uno at lunch", "5 of dogs you can give to anyone", "2 of pigs you can put any card on top", "two chickens at once you have to say double chicken", "pig into pig turns into hogwash", "gambling with candies"], "05-27-2022")
addBlogPost("chairmade", ["handmade", "footmade", "homemade","marmalade"], "05-27-2022");
addBlogPost("untold story", ["the", "the the", "what"], "05-21-2022");
addBlogPost("unrelated", ["parrot", "china", "salamander", "parsley", "bribery", "diction"], "05-21-2022");
addBlogPost("muhumud ale", ["the punch", "the kick", "skrunkly the when"], "05-19-2022");
addBlogPost("just super writing here", ["powerlanguage", "divides", "powergrammar", "powervocabulary", "powersentencestructure", "I have the power"], "05-16-2022");
addBlogPost("reporting 7", ["yet again at the table", "circle table", "people walk past me", "pasta me", "pasta"], "05-13-2022");
addBlogPost("surveillance", ["there is always someone watching you"], "05-12-2022");
addBlogPost("taboo", ["everything is controlled in our society", "talking", "walking", "stalking", "all controlled for their own entertainment"], "05-12-2022");
addBlogPost("hammer and nail", ["hammer hits nail", "nails takes revenge", "no more hammer"], "05-12-2022");
addBlogPost("in the news", ["wealthy african buys bird", "he did it", "44,000,000,000", "free speech"], "04-26-2022");
addBlogPost("pasta update 2", ["I brought elbow pasta today", "usually I bring swirly pasta", "it tasted fine", "fine enough to eat"], "04-25-2022");
addBlogPost("capitalism got me down bad", ["welfare vs ubi", "stocks vs bonds", "poor vs rich", "capitalism vs communism"], "04-25-2022");
addBlogPost("monkeys on the globe", ["we are all monkeys", "walking around on the globe", "giving paper and stealing paper from each other"], "04-25-2022");
addBlogPost("title @p title", ["I walked in", "said,", '"/title @p title @p title @p title @p title @p title"'], "04-12-2022");
addBlogPost("short guy", ["walked into sega", "sonic caught ecoli", "hyper and contracted", "sega'd"], "04-12-2022");
addBlogPost("the toaster", ["I got a toaster", "I burn't my toaster", "There goes the toaster"], "04-12-2022");
addBlogPost("in kahoots", ["Kahoot. Kahooter.", '"I will click the triangle"', "I always choose wrong..."], "04-11-2022");
addBlogPost("tall guy", ["very tall", "back to nintendo", "rolling around in", "miyamoto's grave"], "04-06-2022");
addBlogPost("inverse square law", ["Focus is definition of september"], "03-25-2022");
addBlogPost("bigger and smaller", ["I said I was bigger than him", "He said I was short", "He was short"], "3-21-2022");
addBlogPost("stairs of sadness", ["I take my walk down the stairs of sadness"], "03-17-2022");
addBlogPost("numbers", ["Three is bigger than two only in numbers", "The one who decided it was", "before it wasn't"], "03-10-2022");
addBlogPost("boxes", ["Boxes are falling", "Boxes aren't presents", "They are bombs"], "03-08-2022")
addBlogPost("pasta update", ["I brought a thermos today", "it kept the pasta warm", "not warm enough but warm", "I'm not sure if it is good enough"], "03-07-2022");
addBlogPost("reporting 6", ["I'm back at the beginning again", "again I am"], "03-3-2022");
addBlogPost("reporting 5", ["I will be Gone,", "gone for a long time.", "Until the day of the end.", "Then I will be back again."], "02-20-2022");
addBlogPost("nearly there", ["Not quite.", "Everyone said so,", "but we saw", "just nearly there"], "02-17-2022");
addBlogPost("conversation 2", ["He said: puddle.", "I said: Have you tried?"], "02-17-2022");
addBlogPost("reporting 4", ["I usually sit in the lobby", "on a chair", "perfect"], "02-15-2022");
addBlogPost("reporting 3", ["I usually sit at the end of the table.", "I am sitting in the middle"], "02-14-2022");
addBlogPost("reporting 2", ["I ate a falafel sandwich for dinner yesterday evening.", "It was very tasty.", "10/10 would eat again"], "02-13-2022");
addBlogPost("reporting 1", ["I am on a bus right now,", "it\'s the bus I am on goes back to where I live.", "The problem is that I live in a place"], "02-11-2022");
addBlogPost("conversation 1", ["I said: What do you want me to put on my blog?", "He said: mmmMMmmmm..."], "02-11-2022");
addBlogPost("pasta person", ['I eat pasta', 'at least once', 'every week', '(it\'s a lot of pasta)'], "02-10-2022");
