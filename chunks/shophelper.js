let Category = require('../models/categories');
let SubCategory = require('../models/subcategories');
let Product = require('../models/products');

let subcategorySlug = async (slug) => {
    let result = await SubCategory.find({slug: slug}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    });
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };

 let subcatbycatid = async (catid)=>{
    let result = await SubCategory.find({categoryid: catid}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    });
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };


 let productSlug = async (slug) => {
    let result = await Product.find({slug: slug}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    });
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };

 let allProducts = async ()=>{
    let result = await Product.find({}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    }).sort('name');
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };
 

 let allSubCats = async ()=>{
    let result = await SubCategory.find({}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    }).sort('name');
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };


 let catbyid = async (id)=>{
    let result = await Category.find({_id: id}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    });
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };


let categorySlug = async (slug) => {
    let result = await Category.find({slug: slug}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    });
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };


 let allCats = async ()=>{
    let result = await Category.find({}, (err, data)=>{
        if(err){
            return false;
        }else{
            return data;
        }
    }).sort('name');
    if(result !== false && typeof result !== 'undefined' && result.length > 0){
        return result;
    }else{
        return false;
    }
 };

 module.exports = {
    categorySlug, allCats, subcategorySlug, allSubCats, productSlug, allProducts, catbyid, subcatbycatid
 };