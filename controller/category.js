const Category = require('../models/Category');
const {errorHandler} = require('../helpers/dbError');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) 
           return res.status(400).json({error: 'category does not exist'})
        req.category = category;
        next();
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err){
            return res.status(400).json({error: errorHandler(err)})
        }
        res.json({category: data});
    })
}

exports.update = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, data) => {
        if(err) return res.status(400).json({error: errorHandler(err)});
        res.json(data);
    })
};

exports.remove = (req, res) => {
    const category = req.category;
    category.remove((err, removedCategory) => {
        if(err) return res.status(400).json({error: errorHandler(err)});
        res.json({removedCategory, message: 'Category removed successfully'});
    }) 
};

exports.list = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) return res.status(400).json({error: errorHandler(err)});
        res.json(categories);
    })
};