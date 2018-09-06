

function removeSpaces(str){
    str = str.replace(/[^a-zA-Z ]/g, "");
    str = str.replace(/\s+/g, '-');
    return str;
}

