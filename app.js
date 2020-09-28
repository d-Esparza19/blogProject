var express = require("express"),
    methodOverride = require("method-override");
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


    //App Config
    mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true, useUnifiedTopology: true});
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set('view enginge', 'ejs');
    app.use(methodOverride("_method"));


    var blogSchema = new mongoose.Schema({
        title: String,
        image: {type: String, default: "https://cdn.pixabay.com/photo/2020/05/04/18/55/avocado-5130214__340.png"},
        body: String,
        created: {type: Date, default: Date.now}
    });

    //Mongoose/Model config
    var Blog = mongoose.model("Blog",blogSchema);

    app.get("/",(req,res)=>{
        res.redirect("/blogs");
    });

    app.get("/blogs", (req,res)=>{
        Blog.find({}, (err,blogs)=>{
            if(err){
                console.log("error");
            }else{
                res.render("index.ejs", {blogs: blogs});
            }
        })
        
    });
// New Route
app.get("/blogs/new", (req, res)=>{
    res.render("new.ejs");
});
// create route
app.post("/blogs", (req, res)=>{
    //create blog
    Blog.create(req.body.blog, (err, newBlog)=>{
        if(err){
            console.log(err);
            res.render("new.ejs");
        }else{
            //redirect
            res.redirect("/blogs");
        }
    });
   
});

//Show route
app.get("/blogs/:id", (req, res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("show.ejs", {blog: foundBlog});
        }
    });
});

//Edit route
app.get("/blogs/:id/edit", (req, res)=>{
    Blog.findById(req.params.id,(err, foundBlog)=>{
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }else{
            res.render("edit.ejs",{blog: foundBlog});
        }
    });
});

//Update Route
app.put("/blogs/:id", (req,res)=>{
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Routes
    const port = 3000

    app.listen(port, ()=>{
        console.log("Server Running");
    });

