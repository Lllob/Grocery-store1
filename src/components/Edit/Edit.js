import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import * as postService from '../../services/postService';
import { PostContext } from "../../contexts/PostContext";
//import { AuthContext } from '../../contexts/AuthContext'

const Edit = () => {
    const [post, postState] = useState({});
    const { postEdit } = useContext(PostContext);
    //const { user } = useContext(AuthContext);
    const postId = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        postService.getDetails(postId.id)
            .then(result => {
                postState(result);
            })
    }, [postId.id])

    const onSubmit = (e) => {
        e.preventDefault();

        const editData = Object.fromEntries(new FormData(e.target));

        if (editData.title === '' || editData.description === '' || editData.imageUrl === '' || editData.type === '') {
          return alert('Pleas, fill all fields!')
         }

         
         const formData = new FormData(e.target) 
         const title = formData.get('title')
         const imageUrl = formData.get('imageUrl')
         const description = formData.get('description')
         const type = formData.get('type')

      const data = { 
        title, 
        imageUrl,
        description,
        type,
      } 
    
        postService.editPost(postId.id, data) 
            .then(data => {
              if (data.error) {
                alert(data.error['message'])
                return;
              }
                postEdit(postId.id, data);
                //console.log(`Edit ${result}`)
                navigate(`/details/${postId.id}`)
            });
    };


return(
<section id="edit-page" className="edit">
  <form id="edit-form" onSubmit={onSubmit}>
  <fieldset>
      <legend>Edit Post</legend>
      <p className="field">
        <label htmlFor="title">Title</label>
        <span className="input">
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post.title}
          />
        </span>
      </p>
      <p className="field">
        <label htmlFor="description">Description</label>
        <span className="input">
          <textarea
            name="description"
            id="description"
            defaultValue={post.description}
              
          />
        </span>
      </p>
      <p className="field">
        <label htmlFor="image">Image</label>
        <span className="input">
          <input
            type="text"
            name="imageUrl"
            id="image"
            defaultValue={post.imageUrl}
          />
        </span>
      </p>

      
      <p className="field">
        <label htmlFor="type">Type</label>
        <span className="input">
          <select id="type" name="type">
                <option value="cakes">cakes</option>
                <option value="bread">bread</option>
                <option value="snacks">snacks</option>
                <option value="pies">pies</option>
                <option value="other">other</option>
          </select>
        </span>
      </p>
      
      <input className="button submit" type="submit" defaultValue="Save" />
    </fieldset>
    </form>
</section>
)
  }

export default Edit;

