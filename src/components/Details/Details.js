import {  useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // ID, Link, navigate(/catalog)
import { color, motion } from "framer-motion"  //npm install framer-motion 

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
        <section className="details">
           <div className="imgDiv">
             <img className='image' src={currentPost.imageUrl} alt="images" />
          </div>

         <article className="article"> 
            <h3>{currentPost.title}</h3>
            <p className="type">Type: {currentPost.type}</p>
            <h3>Description: </h3>
            <div className="desc">
              <p>{currentPost.description}</p>
            </div>

        <div className="actions">
          <div className='buys'>
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
            ? <button className="button" onClick={buyHandler}><i className="fa-solid fa-cart-shopping" /></button>
            : ''
            }
            </div>
            }

          <p>Total buys: {totalBuy}</p>
          </div>


            <div className="likes">
              {/* {!like 
                ? <img className="hearts" src="/images/heart.png" alt="images" />
                : <img className={styles['heartss']} src="/images/R.gif" alt="images" />
              } */}
          {!like 
            ? <div>
               {!isOwner &&
                  <div>
                    {!like 
                      ? <motion.button className='likeBtn' onClick={increaseHandler} 
                          initial={{ scale: 1 }} 
                          whileHover={{ scale: 1.1, backgroundColor: "#FFCC4D"}}>
                         <img className="hearts" src="/images/heart.png" alt="images" />
                      </motion.button>
                        : <img className={styles['heartss']} src="/images/R.gif" alt="images" />
                    } 
                  </div>
                 }
            </div>
               :  <img className={styles['heartss']} src="/images/R.gif" alt="images" />
              }
              
              <div id="total-likes">Liks: {totalLikes}</div>
            </div>
            
          </div>
          </article>
      </section>
    )
}

export default Details;

// style={{ background: "red"}}
