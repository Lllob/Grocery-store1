import * as request from "./requester";//get, post, put, dell

const baseUrl = 'http://localhost:5000';

//register
export const register = (username, email, password) =>
    request.post(`${baseUrl}/register`, { username, email, password });

//login
export const login = (email, password) => 
    request.post(`${baseUrl}/login`, { email, password });


//logout
export const logout = async (accessToken) => {
   //request.get(`${baseUrl}/logout`, { accessToken });
    try {  
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken 
            },
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message);
        }

        return response;
    } catch (error) {
        alert(error.message);
        throw error;
    }
};
