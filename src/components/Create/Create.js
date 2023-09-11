import { useContext } from 'react';
import { PostContext } from '../../contexts/PostContext';
import { AuthContext } from '../../contexts/AuthContext';
import * as postService from '../../services/postService';
//import { useNavigate } from 'react-router-dom';

const Create = () => {
    const { postCreate } = useContext(PostContext);
    const { user } = useContext(AuthContext);
    //const navigate = useNavigate()
    
    const onSubmit = (e) => {
        e.preventDefault();

        const postData = Object.fromEntries(new FormData(e.target));
             if (postData.title === '' || postData.description === '' || postData.imageUrl === '' || postData.type === '' || postData.price === '') {
              return alert('Pleas, fill all fields!')
             }

             const formData = new FormData(e.target)
             const title = formData.get('title')
             const imageUrl = formData.get('imageUrl')
             const description = formData.get('description')
             const type = formData.get('type')
             //const price = Number(formData.get('price'))
          const data = {
            title, 
            imageUrl,
            description,
            type,
            owner: user._id,
          }  
          
        postService.create(data)
        .then(data => { 
          if (data.error) {
            alert(data.error['message'])
            return;
          }
            postCreate(data)
        });
        
    };



return(
<section className="forms">
      <form onSubmit={onSubmit} action="/create" method="POST">
        <fieldset>
          <legend>Create to your own taste</legend>
          <p className="field">
            <label htmlFor="title">Title</label>
            <span className="input">
              <input type="text" name="title" id="title" placeholder="Title" />
            </span>
          </p>
          <p className="field description">
            <label htmlFor="description">Description</label>
            <span className="input">
            <textarea name="description" className="description" placeholder="Description" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="image">Image</label>
            <span className="input">
            <input type="text" name="imageUrl" id="image" placeholder="Image" />
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
          <input
            className="button submit"
            type="submit"
            defaultValue="Add Post"
          />
        </fieldset>
      </form>
    </section>
    )
};

export default Create;
