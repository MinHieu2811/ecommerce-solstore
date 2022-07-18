import React from 'react';
import WithRouter from './withRouter';
import jwt_decode from 'jwt-decode';

const parseJwt = (token) => {
    try{
        return JSON.parse(atob(token.split('.')[1]));
    }catch(err) {
        return null;
    }
}

const AuthVerify = (props) => {
    const userInfo = localStorage.getItem('userInfo');
    
    if (userInfo && userInfo.token) {
        const decodedJwt = parseJwt(userInfo.token);
        const { exp } = jwt_decode(decodedJwt); 
        console.log(exp);
        if (exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    return (
        <div></div>
    );
}

export default WithRouter(AuthVerify);