import { useContext, useState, useEffect, } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import * as postService from '../../services/postService'

import ShoppingList from "./ShoppingList/ShoppingList";

const Shopping = () => {
    const [posts, postState] = useState({});
    const { user } = useContext(AuthContext);
    const userId = user._id;

    useEffect(() => {  
        postService.getShopping(userId)
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
        <h1>Basket</h1>
        <ul className="posts">
            {posts.length > 0
                ? posts.map(post => <ShoppingList key={`${post._id}${5*5}`} post={post} />)
                : <p className="no-post">Your basket is emty!</p>
            }
        </ul>
        </section>
    );
};

export default Shopping;
