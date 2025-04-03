import * as api from '../api';
import { setcurrentuser } from './currentuser';
import { fetchallusers } from './users';
export const signup =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.signup(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        dispatch(fetchallusers())
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}
export const login =(authdata,naviagte)=> async(dispatch)=>{
    try {
        const{data}=await api.login(authdata);
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        naviagte("/")
    } catch (error) {
        console.log(error)
    }
}

export const googleLogin = (userData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.googleLogin(userData); // Call API
        dispatch({ type: "AUTH", data }); // Dispatch auth action
        dispatch(setcurrentuser(data)); // Set current user
        localStorage.setItem("Profile", JSON.stringify(data)); // Save in local storage
        navigate("/"); // Redirect to homepage
    } catch (error) {
        console.error("Google Login Error:", error);
    }
};
