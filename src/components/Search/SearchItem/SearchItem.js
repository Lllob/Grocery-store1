import { Link } from 'react-router-dom';

const SearchItem = ({ post }) => { //propsa ot Catalog.js

  return(
      
      <li className="otherBooks">
        <h3>{post.title}</h3>
        <p>Type: {post.type}</p>
        <p className="img">
          <img src={post.imageUrl} alt="images" />
        </p>
        <Link className="button" to={`/details/${post._id}`}>
          Details
        </Link>
      </li>
    )
  }

  export default SearchItem