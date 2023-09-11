import { useContext, useState, useEffect, } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService'

import MyPostsItem from "./MypostsItem/MyPostsItem";

const MyPosts = () => {
    const [posts, postState] = useState({});
    const { user } = useContext(AuthContext);
    const userId = user._id;
    //console.log(`Mypost user ${user._id}`)
    useEffect(() => {  
        postService.getMyPosts(userId)
            .then(result => { 
                if (result.error) {
                    alert(result.error['message'])
                    return;
                   }
                postState(result)
            });
    }, [userId]);
    
    return (
        <section className="catalog">
        <h1>Your posts</h1>
        <ul className="posts">
            {posts.length > 0
                ? posts.map(post => <MyPostsItem key={`${post._id}${5*5}`} post={post} />)
                : <p className="no-post">You have not created any posts!</p>
            }
        </ul>
        </section>
    );
};

export default MyPosts;
