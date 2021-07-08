/* eslint-disable import/no-anonymous-default-export */

export default function(wishlist = [], action) {
    if(action.type === 'addArticle') {
        let newtab = [...wishlist];
        const checkUnique  = newtab.some(check => check.title === action.payload.title);
        if (checkUnique === false) newtab.push(action.payload)
    return newtab;
    } else if(action.type === 'removeArticle') {
        let newtab = [...wishlist];
        const newtabFilter =  newtab.filter(article => article.title !== action.payload)
    return  newtabFilter;
    }  else {
    return wishlist;
    }
    }