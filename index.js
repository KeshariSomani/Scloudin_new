const express = require('express')
const database = require('./database/connection')
const mainController = require('./controller/mainController')
const blogModel = require('./models/blogModel')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.set('view engine','ejs')
app.set('views','views')
app.use('/public',express.static('./public'))
app.use('/assets',express.static('assets'));
app.get('/', (req, res) => res.render('home'))
app.get("/careers",mainController.get_career_page)
app.get("/your_career",mainController.get_single_career_page)
app.get('/admin_dashboard',(req,res)=>res.render('adminDashboard'))
app.get('/add_job',mainController.get_add_job_page)
app.get('/delete_job',mainController.delete_job)
app.post('/add_job',mainController.add_jobs)
app.get('/add_blog',mainController.get_add_blog_page)
app.get('/about',(req,res)=>res.render('about'))
app.get('/contact',(req,res)=>res.render('contact'))
app.get('/hireus',(req,res)=>res.render('hireus'))
app.get('/services',(req,res)=>res.render('services'))
app.get('/technology',(req,res)=>res.render('technology'))
app.get('/products',(req,res)=>res.render('products'))
app.get('/admin_queries',mainController.get_form_data)
app.get('/your_blog',mainController.get_single_blog_page)
app.get('/blogs',mainController.get_all_blogs)
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'/public/blogImages'),function(error,success){
            if(error) throw error
        })
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname
        cb(null,name),function(error,success){
            if(error) throw error
        }
    }

})

const upload = multer({storage:storage})

app.post("/add_blog",upload.single('blog_image'),async (req,res)=>{
    try
    {
        req.body.blog_image_url = req.file.filename
        const blog_data = await blogModel.create(req.body)
        res.redirect('/add_blog')
    }
    catch(error)
    {
        console.log(error.message)
    }
})

app.get('/delete_blog',async (req,res)=>{
    try
    {
        const blog_id = req.query.id
        const blog_data = await blogModel.findById({_id:blog_id})
        const image_path = path.join(__dirname,'/public/blogImages',blog_data.blog_image_url)
        deleteUploadedFiles(image_path)
        const blog = await blogModel.findByIdAndDelete(blog_id)
        res.redirect('/add_blog')
    }
    catch(error)
    {
        console.log(error.message)
    }
})
app.post('/submit_contact_form',mainController.submit_contact_form)


function deleteUploadedFiles(filePath) {
        fs.unlink(filePath, err => {
            if (err) {
                console.error(`Error deleting ${filePath}:`, err);
                // Handle the error (log it or perform other actions)
            } else {
                console.log(`${filePath} was deleted successfully`);
            }
        });
}


app.listen(port,()=>{
    database.databaseConnection();
    console.log(`Server is running at ${port}`)
})

