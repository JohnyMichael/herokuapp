let SubCategory = require('../models/subcategories');

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

 module.exports = {
    subcategorySlug, allSubCats
 };