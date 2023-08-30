import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

import CatalogItem from "./CatalogItem/CatalogItem";

const Catalog = () => {
    
    const { posts } = useContext(PostContext);//we take posts from context(PostContext)

    return (
        <section id="dashboard-page" className="dashboard">
        <h1>Catalog</h1>

        <ul className="other-books-list">
            {posts.length > 0 
                ? posts.map(post => <CatalogItem key={`${post._id}${5*8}`} post={post} />)
                : <p className="no-books">No post in database!</p>
                
            }
        </ul>
        </section>
    );
};

export default Catalog;
