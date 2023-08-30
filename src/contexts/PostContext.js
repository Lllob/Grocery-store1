import { createContext, useReducer, useEffect } from "react";//createContext(the context), userReducer(similar to useState) dynamic precise capture of changes
import { useNavigate } from 'react-router-dom';

import * as postService from '../services/postService';// POST, GET

export const PostContext = createContext();

//auxiliary function
const postReducer = (state, action) => {//with the postReducer we make the changes
    switch (action.type) {
        
        case 'CATALOG': 
            return action.data;

        case 'CREATE'://create
            return [...state, action.data];
            
         case 'DETAILS': 
            return state.map(p => p._id === action.postId ? action.data : p);//old posts, if there is a change in the specific post, replace it with the new data, if not add the old one

        case 'EDIT'://edit
            return state.map(p => p._id === action.postId ? action.data : p);

        case 'REMOVE'://delete
            return state.filter(p => p._id !== action.postId);

        default: 
            return state; //give old data
    }

};

///
export const PostProvider = ({   //go in App.js 
    children,      //all jsx between <postProvider>htmla</postProvider> in App.js
}) => {
    const navigate = useNavigate();
    const [posts, dispatch] = useReducer(postReducer, []);//useReducer()// in dispatch we enter the data, and it goes to the above function postReducer(
   
    useEffect(() => { 
        postService.getCatalog()
            .then(result => { 
                 const actio = {   
                    type: 'CATALOG', 
                    data: result,   
                };
                dispatch(actio); 
            });
    }, []);
    
    
    
    //za details
    const tekPost = (postId) => {
        return posts.find(p => p._id === postId) || {}; 
    };
     

   // details 
    const postDetails = (data, postId) => {
        if (data) {
        const action = { 
            type: 'DETAILS', 
            data,
            postId,   
        };
        dispatch(action)
    }
    };
   
   //create
    const postCreate = (postData) => {
        dispatch({
            type: 'CREATE',
            data: postData,
        })
        //console.log(posts)
        navigate('/catalog');
    };
    


    //edit
    const postEdit = (postId, postData) => {
        dispatch({
            type: 'EDIT',
            data: postData,
            postId,
        });
        
    };

    //delite
    const  postRemove = (postId) => {
        dispatch({
            type: 'REMOVE',
            postId,
        })
        //console.log(postId)
    }


    
    return (
        <PostContext.Provider value={{
            posts, 
            postCreate,
            postEdit,
            postRemove,
            postDetails,
            tekPost,
        }}>
            {children}
        </PostContext.Provider>
    );
}
