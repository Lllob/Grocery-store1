import { useContext,  useState } from "react";
import { PostContext } from "../../contexts/PostContext";

import SearchItem from "./SearchItem/SearchItem";
import { motion } from "framer-motion"  //npm install framer-motion 


const Search = () => {
  const [search, setSearch] = useState([])
  const { posts } = useContext(PostContext);

    
  const onSubmit = (e) => { 
    e.preventDefault();
   
    let searchField = Object.fromEntries(new FormData(e.target))

     const searchList = posts.filter(p =>
      p.title.toLowerCase().includes(searchField.search.toLowerCase()));

       setSearch(searchList) 
       
       e.target.reset() //we clear the input
  }   


 
  return(
  <section id="search">
  <h2>Search by Title</h2>
  <form onSubmit={onSubmit} className="search-wrapper">
    <input
      id="search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required=""
    />
     <motion.button type="submit"
      whileHover={{ scale: 1.1, backgroundColor: "#51b05c"}}
      whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
      >Search
    </motion.button>
  </form>
  <h5>Results:</h5>
  <div id="search-container">
    <ul className="card-wrapper">
            {search.length === 0  
             ? <h4>There are no results found.</h4>
            : search.map(post => <SearchItem key={`${post._id}${4*2}`} post={post} />)
            } 
    </ul>
    </div>
</section>
  )
}

export default Search;


