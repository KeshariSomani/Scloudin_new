const express = require('express')
const database = require('./database/connection')
const mainController = require('./controller/mainController')
const blogModel = require('./models/blogModel')
const headerMail = require('./models/header_mail')
const bannerModel = require('./models/bannerModel')
const aboutContentModel = require('./models/aboutContentModel')
const productcardModel = require('./models/productcardModel')
const footerModel = require('./models/footerModel')
const fs = require('fs')
const multer = require('multer')
const path = require('path')
const app = express()
const port = 4000
const bodyParser = require('body-parser')
const adminauth = require('./middleware/adminauth')
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
const session = require('express-session')
app.use(session(
    {
        secret:"Mysecret",
        resave:false,
        saveUninitialized:false
    }
))
app.set('view engine','ejs')
app.set('views','views')
app.use('/public',express.static('./public'))
app.use('/assets',express.static('assets'));

app.get('/',async (req,res)=>
{
    try
    {
        const banner_data = await bannerModel.find()
        const about_content = await aboutContentModel.findOne()
        const product_data = await productcardModel.find()
       
        res.render('home',{banner_data:banner_data,about_content:about_content,product_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
})


app.get("/careers",mainController.get_career_page)
app.get("/your_career",mainController.get_single_career_page)
app.get('/admin/admin_dashboard',adminauth.adminisLogin,(req,res)=>res.render('adminDashboard'))
app.get('/admin/add_job',adminauth.adminisLogin,mainController.get_add_job_page)
app.get('/admin/delete_job',adminauth.adminisLogin,mainController.delete_job)
app.post('/admin/add_job',adminauth.adminisLogin,mainController.add_jobs)
app.get('/admin/add_blog',adminauth.adminisLogin,mainController.get_add_blog_page)
app.get('/admin/adminHome',mainController.get_manage_home_page)

app.get('/about',(req,res)=>res.render('about'))



app.get('/contact',(req,res)=>res.render('contact'))



app.get('/hireus',(req,res)=>res.render('hireus'))
app.get('/services',(req,res)=>res.render('services'))
app.get('/technology',(req,res)=>res.render('technology'))
app.get('/products',(req,res)=>res.render('products'))
app.get('/admin/admin_queries',adminauth.adminisLogin,mainController.get_form_data)
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

app.get('/admin/admin_login',mainController.get_admin_login_page)
app.post('/admin_login',mainController.admin_login)
app.get("/admin/admin_logout",(req,res)=>
{
    try
    {
        req.session.destroy();
        res.redirect("/admin/admin_login")
    }
    catch(error)
    {
        console.log(error.message)
    }
})
// Dynamic Pages API

app.post('/add_header_email',async (req,res)=>{
    try
    {
        const header_email = await headerMail.create(req.body)
        res.status(200).json("Header Email successfully added")
    }
    catch(error)
    {
       return res.status(400).json({error:error.message})
    }
})

app.post('/update_header_email',async (req,res)=>{
    try
    {
         const header_email = await headerMail.findByIdAndUpdate({_id:req.body.id},{$set:{header_email:req.body.email}})
         res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }

})

app.get('/get_header_email', async(req,res)=>
{
    try
    {
       const header_email = await headerMail.findOne()
       res.status(200).json(header_email)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})




const bannerstorage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'/public/bannerImages'),function(error,success){
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

const bannerupload = multer({storage:bannerstorage})

app.post("/add_banner_image",bannerupload.single('banner_image'),async (req,res)=>{
    try
    {
        req.body.banner_image_url = req.file.filename
        const banner_data = await bannerModel.create(req.body)
        res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.get('/get_banner_images',async (req,res)=>{
    try
    {
        const banner_data = await bannerModel.find()
        res.status(200).json({data:banner_data})
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.get('/delete_banner_image',async (req,res)=>{
    try
    {
        const banner_id = req.query.banner_id
        const banner_data = await bannerModel.findById({_id:banner_id})
        const image_path = path.join(__dirname,'/public/bannerImages',banner_data.banner_image_url)
        deleteUploadedFiles(image_path)
        const banner = await bannerModel.findByIdAndDelete(banner_id)
        res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.post('/add_about_content',async (req,res)=>{
    try
    {
        const about_content = await aboutContentModel.create(req.body)
        res.status(200).json("About Content successfully added")
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.get('/get_about_content',async (req,res)=>{
    try
    {
        const about_content = await aboutContentModel.findOne()
        res.status(200).json(about_content)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.post('/update_about_content',async (req,res)=>{
    try
    {
         
           const about_content = await aboutContentModel.findByIdAndUpdate({_id:req.body.id},{$set:{about_heading:req.body.about_heading,about_description:req.body.about_description}})
           res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})


app.post('/add_product_card', async (req,res)=>{

    try
    {
        const product_card = await productcardModel.create(req.body)
        res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.get('/get_product_card',async (req,res)=>{
    try
    {
        const product_card = await productcardModel.find()
        res.status(200).json(product_card)
    }
    catch(error)
    {
            return res.status(400).json({error:error.message})
    }
})

app.get('/delete_product_card',async (req,res)=>{
    try{
            const product_card = await productcardModel.findByIdAndDelete({_id:req.query.id})
            res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
})

app.post('/add_footer_content',async (req,res)=>{

    try
    {
        const footer_content = await footerModel.create(req.body)
        res.status(200).json("Footer Content successfully added")
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }

})

app.get('/get_footer_content',async (req,res)=>{
    try
    {
        
        const footer_content = await footerModel.findOne()
        res.status(200).json(footer_content)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }

})

app.post('/update_footer_content',async (req,res)=>{
    try
    {
         const footer_content = await footerModel.findByIdAndUpdate({_id:req.body.id},{$set:{mobile_number:req.body.mobile_number,email:req.body.email,address:req.body.address}})
         res.redirect('/admin/adminHome')
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }

})

// Test Api 

app.get('/route_name' , async (req,res)=>
{
    res.render('file_name')
})







app.listen(port,()=>{
    database.databaseConnection();
    console.log(`Server is running at ${port}`)
})

