export const fetchUser = () =>{
    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')): localStorage.clear();
    return userInfo

    /*Rewrite the userInfo into data.js we can simply use this variable by calling the function fetchUser*/
}