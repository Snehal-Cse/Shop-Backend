// jwt is used for authorization not authentication
require('./db/db')
const productModel = require('./model/model')
const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const multer= require('multer')
const cors = require('cors');
app.use(express.json())
app.use(cors());
const path = require('path');
app.use(express.urlencoded({extended:false}))

// storage engine 

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
     return cb(null, './upload/images')
    },
    filename:  (req, file, cb) =>{
     return  cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({ storage: storage })

  // create product 
  app.use('/images', express.static('./upload/images'))
  app.post('/upload', upload.single('product'),(req,res)=>{
    console.log(req.file)
    console.log(req.body)
    res.json({
        success:true,
        image_url: `http://localhost:3001/images/${req.file.fieldname}`
    })
  })
  app.post('/addProducts', async(req,res)=>{
    let product = await productModel.find({})
    let id;
    if(product.length>0){
         let last_product_array = product.slice(-1)
         let last_product = last_product_array[0]
         id = last_product.id + 1;
    }
    else{
        id=1;
    }
    const products = new productModel({
        id:id,
        desc:req.body.desc,
        category:req.body.category,
        newPrice: req.body.newPrice,
        oldPrice:req.body.oldPrice
    })
    await products.save()
    console.log(products)
    return res.status(200).json({
        success:true,
        desc:req.body.desc
    })
  })
  // delete product 

  app.post('/deleteProduct', async(req,res)=>{
    
    await productModel.findOneAndDelete({id: req.body.id})
   res.status(200).json({
    success: true,
   })
    
  })

  // get all products 
  app.get('/allProduct', async(req,res)=>{
    let allProducts = await productModel.find({})
    console.log("products found")
    res.status(200).json(allProducts)
  })

app.listen(3001, ()=>{
    console.log("Server has started")
})

