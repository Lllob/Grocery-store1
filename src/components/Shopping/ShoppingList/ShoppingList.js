import { Link } from 'react-router-dom';

const ShoppingList = ({ post }) => {

  return(
      
      <li className="post">
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

  export default ShoppingList
