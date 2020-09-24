var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

    //App Config
    mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser: true, useUnifiedTopology: true});
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.set('view enginge', 'ejs');
   


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


//Routes
    const port = 3000

    app.listen(port, ()=>{
        console.log("Server Running");
    });

