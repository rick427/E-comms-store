const Product = require('../models/Products');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const {errorHandler} = require('../helpers/dbError');

//Get product by Id
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
      if(err || !product){
          res.status(400).json({error: "Product not found"})
      }
      req.product = product;
      next();
    });
};


//Read a single product
exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//Create Product
exports.create = (req, res) => {
    //all form data
    let form = new formidable.IncomingForm()

    //keep extensions i.e jpeg, png etc
    form.keepExtensions = true;

    //parse the form data
    form.parse(req, (err, fields, files) => {
      if(err) return res.status(400).json({error: 'Image could not be uploaded'});
      
      //check for all fields
      const {
        name,
        description,
        price,
        category,
        quantity,
        shipping
      } = fields

      if(!name || !description || !price || !category || !quantity || !shipping){
          res.status(400).json({error: "Please fill in all fields"})
      }
      
      //cretae a new product
      let product = new Product(fields)

      //1kb = 1000
      //1mb = 1000000

      //if we have a file 
      if(files.photo){
          //console.log('Files photo', files.photo)
          if(files.photo.size > 1000000){
              return res.status(400).json({error: 'Image must be less than 1mb'});
          }
          product.photo.data = fs.readFileSync(files.photo.path);
          product.photo.contentType = files.photo.type
      }

      product.save((err, result) => {
          if(err){
              return res.status(400).json({error: errorHandler(err)})
          }
          res.json(result);
      })
    })
}


//Delete Product
exports.remove = (req, res) => {
    let product = req.product;
    req.product.photo = undefined;
    product.remove((err, removedProduct) => {
        if(err) return res.status(400).json({error: errorHandler(err)});

        res.json({removedProduct,message: "Product Deleted Sucessfully"});
    })
}


//Update Product
exports.update = (req, res) => {
    //all form data
    let form = new formidable.IncomingForm()

    //keep extensions i.e jpeg, png etc
    form.keepExtensions = true;

    //parse the form data
    form.parse(req, (err, fields, files) => {
      if(err) return res.status(400).json({error: 'Image could not be uploaded'});
      
      //check all the fields
      const {
        name,
        description,
        price,
        category,
        quantity,
        shipping
      } = fields

      if(!name || !description || !price || !category || !quantity || !shipping){
          res.status(400).json({error: "Please fill in all fields"})
      }
      
      let product = req.product;
      product = _.extend(product, fields);

      //1kb = 1000
      //1mb = 1000000

      //if we have a file 
      if(files.photo){
          //console.log('Files photo', files.photo)
          if(files.photo.size > 1000000){
              return res.status(400).json({error: 'Image must be less than 1mb'});
          }
          product.photo.data = fs.readFileSync(files.photo.path);
          product.photo.contentType = files.photo.type
      }

      product.save((err, result) => {
          if(err){
              return res.status(400).json({error: errorHandler(err)})
          }
          res.json(result);
      })
    })
}

/**
 * [description]
 * sell =      /products?sortBy=sold&order=desc&limit=4
 * arrival =   /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then give all products
 */
 exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, products) => {
          if(err) return res.status(400).json({error: "Product not found"});
          res.send(products);
      });
 };


 /**
  * [description]
  * This will find the products based on the req product category
  * other products that has the same category will be returned
  */
  exports.relatedProductsList = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
    
    Product.find({_id: {$ne: req.product}, category: req.product.category})
      .select('-photo')
      .limit(limit)
      .populate('category', '_id name')
      .exec((err, products) => {
        if(err) return res.status(400).json({error: "Product not found"});
        res.json(products)
      });
  }

exports.listProductCategory = (req, res) => {
    // get all the categories that are used in the product model
    Product.distinct("category", {}, (err, categories) => {
        if(err) return res.status(400).json({error: "Categories not found"});
        res.json(categories);
    });
}


/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.getPhoto = (req, res, next) => {
  if(req.product.photo.data){
      res.set('Content-Type', req.product.photo.contentType)
      return res.send(req.product.photo.data)
  }
  next();
}