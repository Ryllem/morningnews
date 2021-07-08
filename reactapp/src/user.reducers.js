/* eslint-disable import/no-anonymous-default-export */

export default function(user = {name: "", token: null, language: "fr"}, action) {
    
    if(action.type === 'addInfo') {
        console.log("payload", action.payload)
        let userInfo = {...user};
        userInfo.name = action.payload.username
        userInfo.token = action.payload.token;
        userInfo.language = action.payload.language
    return userInfo
    } else if(action.type === 'setLangue') {
        console.log("payload", action.payload)
        let userInfo = {...user};
        userInfo.language = action.payload
    return userInfo
    } else {
    return user;
    }
    }