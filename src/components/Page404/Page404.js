import { Link } from 'react-router-dom';

const Page404 = () => {
return (
<section id="not-found-page">
  <div className="not-found-page-container">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The Page you are looking for doesn't exist or another error occurred. Go
      to{" "}
      <Link to="/" className="btn">
        Home
      </Link>
    </p>
  </div>
</section>
)
}

export default Page404;