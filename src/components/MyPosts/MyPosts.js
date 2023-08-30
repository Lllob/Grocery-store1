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
        <section id="dashboard-page" className="dashboard">
        <h1>Catalog</h1>
        <ul className="other-books-list">
            {posts.length > 0
                ? posts.map(post => <MyPostsItem key={`${post._id}${5*5}`} post={post} />)
                : <p className="no-books">No post in database!</p>
            }
        </ul>
        </section>
    );
};

export default MyPosts;
