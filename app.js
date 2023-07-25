//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hello , Everyone I am Gargi Jaiswal. A serial addictor and a painter by birth . I was born in Patna on 11th March,2003 at my maternal parent's house. Currently ,I am pursuing my B.tech from Nit Agartala in CSE in 3rd Year. This place has given me many good memories ,it is like a second home to me.I got friends like Punit , Sadhana , Mishan , Muskan, Shalini, Rishika , Abhiraj, Abhishek and many more .I do competetive programming and an enthusiast to learn web development.  ";
const aboutContent = "Let me tell you something about my educational life. From my early childhood my lovely mother use to teach me , my first teacher. It was her guidance and hrad work due to which today I am in an engineering college. My father he always wanted me to achieve a lot and he said me 'Beta ! you can achieve everything what you want but the thing you have to do is hard workand study a lot'.He enrolled me in one of the best school in my locality Ursuline Convent English Medium School my another life changer. I studied there from Std 3 till std 10. Athough it wasn't affiliated so on certificate my school name is St. Teresa School, Bhagalpur. After that I went to Batul Da coaching institute for my higher education studies . This is the place which made me able to crack JEE MAINS. And today I am in NIT Agartala.";
const contactContent = "To contact me My phone no. is: 8798706612 and my email id is jaisgargi@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
