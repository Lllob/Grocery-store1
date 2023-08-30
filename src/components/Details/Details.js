import {  useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // ID, Link, navigate(/catalog)
import { motion } from "framer-motion"  //npm install framer-motion 

import { PostContext } from '../../contexts/PostContext';
import { useAuthContext } from '../../contexts/AuthContext';
import * as postService from '../../services/postService';

import styles from '../../Stylee.module.css'

const Details = () => {
    //const [detail, setDetail] = useState()

    let [totalLikes, setTotalLikes] = useState('') 
    let [like, setLiks] = useState(false);

    let [totalBuy, setTotalBuy] = useState('')
    let [buy, setBuy] = useState(false)//buys
    
    const postId = useParams();
    const { postDetails, tekPost, postRemove } = useContext(PostContext);
    const { user } = useAuthContext()
    const navigate = useNavigate();
    
   useEffect(() => {
      postService.getDetails(postId.id)
        .then(data => {
          if (data.error) {
            alert(data.error['message'])
            return;
          } else {
            postDetails(data, data._id) 
            // setDetail(result)

            //we take the number of users who bought the post
            setTotalBuy(data.boughtBy.length)
            setTotalLikes(data.likes.length)
          
            //has usera already bought the post
            setBuy(data.boughtBy.includes(user._id))
            setLiks(data.likes.includes(user._id))
           }
        })
        //eslint-disable-next-line 
  }, [postId.id])
    


      const currentPost = tekPost(postId.id);
      const isOwner = currentPost.owner === user._id;
     
       
    /////Delete
    const postDeleteHandler = () => {
      const confirmation = window.confirm('Are you sure you want to delete this book?');
      if (confirmation) {
          postService.remove(postId.id)
              .then(() => { 
                  postRemove(postId.id); 
                  navigate('/catalog');
              })
      }
    }


  /////////buy
  const buyHandler = () => {

    postService.buy(postId.id)
           .then(result => { 
               //console.log(`totalBuys ${result}`)
               setTotalBuy(result) 
               return alert('You have buy it')
           })   
           setBuy(true)   
  }

      
    
     //likes
     const increaseHandler = () => { 
      postService.likePost(postId.id) 
      .then(result => {
         // console.log(`totalLikes ${result}`)
          setTotalLikes(result) 
          return alert('You have like it')
      })
        setLiks(true);
     }


    return(
        <section id="details-page" className="details">
         
        <div className="book-information">
       
          <h3>{currentPost.title}</h3>
          <p className="type">Type: {currentPost.type}</p>
          <p className="img">
            <img src={currentPost.imageUrl} alt="images" />
          </p>
          <div className="actions">
            {/* Edit/Delete buttons ( Only for creator of this book ) */}
            {isOwner && 
            <div>
            <Link className="button" to={`/edit/${currentPost._id}`}>
              Edit  
            </Link>
            <button className="button" onClick={postDeleteHandler}>
              Delete
              </button>
            </div>
            } 
           
           {!isOwner &&
           <div>
            {!buy
            ? <button className="button" onClick={buyHandler}>Buy</button>
            : ''
            }
            </div>
            }
             <p>Total buys: {totalBuy}</p>

            <div className="likes">
              {!like 
                ? <img className="hearts" src="/images/heart.png" alt="images" />
               : <img className={styles['heartss']} src="/images/R.gif" alt="images" />
              }
              <span id="total-likes">Liks: {totalLikes}</span>
                {!isOwner &&
                <div>
                 {!like 
                  ? <motion.button onClick={increaseHandler}
                  whileHover={{ scale: 1.1, backgroundColor: "#51b05c"}}
                  // whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
                 >Like
                 </motion.button>
                    : ''
                 } 
              </div>
            }
              
            </div>
        
          </div>
        </div>
        <div className="book-description">
          <h3>Description:</h3>
          <p>
           {currentPost.description}
          </p>
        </div>
        
      </section>
    )
}

export default Details;

// style={{ background: "red"}}
