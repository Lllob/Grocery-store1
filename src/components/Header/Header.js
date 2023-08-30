import { Link } from 'react-router-dom';
import { useContext  } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext); 

  return(
    <header id="site-header">
    {/* Navigation */}
    <nav className="navbar">
      <section className="navbar-dashboard">
      <Link className="button" to="/">Home</Link>
      <Link to="/catalog">Catalog</Link>

      {/* Logged-in users */}
      {user.email
        ? 
        <div id="user">
          <span>
          {user.email && <span>Welcome{user.email}</span>}
          </span>
          <Link className="button" to="/mylist/:id">My List</Link>
          <Link className="button" to="/create">Create your own</Link>
          <Link className="button" to="/logout">Logout</Link>
          <Link className="button" to="/search">Search</Link>
          <Link className="button" to="/shopping/:id"><i className="fa-solid fa-cart-shopping" /></Link>
        </div>
        :
         <div id="guest">
         <Link className="button" to="/login">Login</Link>
         <Link className="button" to="/register">Register</Link>
       </div>}
      </section>
    </nav>
  </header>
  )
}

export default Header;
