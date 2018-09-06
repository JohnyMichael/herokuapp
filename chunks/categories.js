let Category = require('../models/categories');

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
    categorySlug, allCats
 };