import * as request from "./requester"; //fetch, GET, POST, DELELE

const baseUrl = 'http://localhost:5000';

export const getCatalog = () => request.get(`${baseUrl}/catalog`);//vzimame dannite ot sarvara

export const getDetails = (postId) => request.get(`${baseUrl}/details/${postId}`);

export const create = (postData) => request.post(`${baseUrl}/create`, postData);

export const editPost = (postId, postData) => request.put(`${baseUrl}/edit/${postId}`, postData);

export const remove = (postId) => request.get(`${baseUrl}/delete/${postId}`);


//buys
export const buy = (postId) => request.put(`${baseUrl}/buy/${ postId }`);

//likes:
export const likePost = (postId) => request.put(`${baseUrl}/likes/${ postId }`);

//My Posts
export const getMyPosts = (userId) => request.get(`${baseUrl}/mylist/${ userId }`)

//Shopping
export const getShopping = (userId) => request.get(`${baseUrl}/shopping/${ userId }`)