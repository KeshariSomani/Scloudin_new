const contactModel = require('../models/contactModel')
const {contactFormValidation} = require('../validations/formValidations')
const jobModel = require('../models/jobModel')
const blogModel = require('../models/blogModel')
const headerMail = require('../models/header_mail')
const bannerModel = require('../models/bannerModel')
const aboutContentModel = require('../models/aboutContentModel')
const productcardModel = require('../models/productcardModel')
const footerModel = require('../models/footerModel')
const multer = require('multer')
const path = require('path')
const env= require('../environment/env')
exports.submit_contact_form = async (req,res)=>
{
    
    const {error} = contactFormValidation(req.body)
    if(error)
    {
        return res.status(400).json(error.message)
    }
    try
    {
          const contactFormValidation = await contactModel.create(req.body)
          return res.status(200).json("Form submitted successfully")
    }
    catch(error)
    {
           return res.status(200).json(error.message)
    }
}

exports.add_jobs = async (req,res)=>
{
    try
    {
       const jobdata = await jobModel.create(req.body)
       res.redirect('/add_job')
    }
    catch(error)
    {
        console.log(error.message)
    }
}
exports.get_add_job_page = async (req,res)=>
{
    try
    {
        const jobs_data = await jobModel.find()
        res.render('add_job',{jobs_data:jobs_data})
    }
    catch(error)
    {
         console.log(error.message)
    }
   
}
exports.get_jobs = async (req,res)=>
{
    try
    {
       const jobs = await jobModel.find()
       res.render('careers',{jobs})

    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.delete_job = async (req,res)=>
{
    try
    {
        const job_data = await jobModel.findByIdAndDelete({_id:req.query.id})
        res.redirect('/add_job')
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_single_career_page = async (req,res)=>
{
  try
  {
      const job_data = await jobModel.findOne({_id:req.query.id})
      res.render('singler_career',{job_data:job_data})
  }   
  catch(error)
  {
           console.log(error.message)
  }
}

exports.get_career_page = async (req,res)=>
{
    try
    {
       const job_data = await jobModel.find()
       res.render('careers',{job_data:job_data})
    }
    catch(error)
    {
         console.log(error.message)
    }
}





exports.get_add_blog_page = async (req,res)=>
{
    try
    {
         const blog_data = await blogModel.find()
          res.render('add_blog',{blogs_data:blog_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_all_blogs = async (req,res)=>
{
    try
    {
          const blogs_data = await blogModel.find()
          res.render('blogs',{blogs_data:blogs_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_single_blog_page = async (req,res)=>
{
    try
    {
           const blog_data = await blogModel.findOne({_id:req.query.id})
           res.render('single_blog',{blog_data:blog_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_form_data = async (req,res)=>{
    try
    {
         const form_data = await contactModel.find()
         res.render('admin_queries',{queries:form_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_admin_login_page = async (req,res)=>
{
    try
    {
        res.render('admin_login')
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.admin_login= async (req,res)=>
{
    try
    {
       
        if(req.body.admin_id==env.admin_id && req.body.admin_password==env.admin_password)
        {
            req.session.admin_id = req.body.admin_id
            res.redirect('/admin/admin_dashboard')
        }
        else
        {
            res.status(400).json("Invalid credentials")
        }
    }
    catch(error)
    {
        console.log(error.message)
    }
}

exports.get_manage_home_page = async (req,res)=>

{
    try
    {
        const header_email = await headerMail.findOne()
        const banner_data = await bannerModel.find()
        const about_content = await aboutContentModel.findOne()
        const product_cards = await productcardModel.find()
        const footer_data = await footerModel.findOne()
       
        res.render('adminHome',{header_email:header_email,banner_data:banner_data,about_content:about_content,product_cards:product_cards,footer_data:footer_data})
    }
    catch(error)
    {
        console.log(error.message)
    }
}
