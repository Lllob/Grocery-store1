import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

const CatalogItem = ({ post }) => { //props
  const { isAuthenticated } = useContext(AuthContext)
  let user = isAuthenticated

  return(
      
      <li className="otherBooks">
        <h3>{post.title}</h3>
        <p>Type: {post.type}</p>
        <p className="img">
          <img src={post.imageUrl} alt="images" />
        </p>

        {user &&
        <Link className="button" to={`/details/${post._id}`}>
          Details
        </Link>
       }
      </li>
    )
  }

  export default CatalogItem
