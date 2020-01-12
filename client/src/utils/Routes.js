const baseurl = "http://localhost:5000/api/v1";

export const index = `${baseurl}/`; // method: get
export const authLogin = `${baseurl}/auth/login`; // method: post
export const authRegister = `${baseurl}/auth/register`; // method: post
export const dashboard = `${baseurl}/users/dashboard`; // method: get