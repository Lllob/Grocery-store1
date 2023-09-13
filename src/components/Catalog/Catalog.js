import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    
    const { posts } = useContext(PostContext);//we take posts from context(PostContext)

    return (
        <section id="catalog" className="catalog">
        <h1>Our Catalog</h1>

        <ul className="posts">
            {posts.length > 0 
                ? posts.map(post => <CatalogItem key={`${post._id}${5*8/3}`} post={post} />)
                : <p className="no-post">No post in database!</p>
                
            }
        </ul>
        </section>
    );
};

export default Catalog;
