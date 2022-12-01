import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deletePost, editPost } from "../../store/posts";
import { createShop, editShop, fetchOneShop } from "../../store/shops";
import './editpost.css'

const EditPostForm = ({setEditPos}) => {
    const {shopId,id} = useParams()
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state)=> state.users )
    const postState = useSelector((state) => state.posts)
    const shops = Object.values(shopState)
    const posts = Object.values(postState)
    const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
    const thisPost = posts.filter(post => post.id == +id)[0]
    const dispatch = useDispatch()
    const [name, setName] = useState(thisPost?.name)
    const [price, setPrice] = useState(thisPost?.price)
    const [description, setDescription] = useState(thisPost?.description)
    const [appear,setAppear] =useState(false)
    const [appear2,setAppear2] =useState(true)
    const [image, setImage] = useState(thisPost?.image)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name",name)
        payload.append("description",description)
        payload.append("price",price)
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        
        const res = await dispatch(editPost(payload,shopId,id))
        if (res) {
          if (res.image) {
            // await res.json();
            setImageLoading(false);
            // history.push("/");
            setEditPos(false)
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            setErrors([res])
        }
    }
  }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <form className="postformwrap"  onSubmit={handleSubmit}>
          <div className="posttop">Update your Post Details!</div>
          <div className="errors">
                {errors?.map((error, ind) => (
                    <div className="errors" key={ind}>{error}</div>
                ))}
            </div>
            <label className='wrapyo'>Image File</label>
            {appear2 &&
            <button className="butto" onClick={()=>(setAppear(true),setAppear2(false))}>Select a New Image</button>}
            {appear &&
            
            <input className="fileya"
              type="file"
              accept="image/*"
              onChange={updateImage}
              
            />}
            <label className='wrapyo'>Post Name</label>
            <input className="wrapya"
            type="text"
            maxLength={20}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className='wrapyo'>Post Description</label>
          <input className="wrapya"
            type="text"
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className='wrapyo'>Price</label>
          <input className="wrapyi"
            type="number"
            step=".01"
            min={1}
            max={999999}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
           <div className="postsubwrap">
            <button className="postsub" type="submit">Edit this Post</button>
            <div className="deletwrap"> 
            <button className="delet" onClick={()=> (dispatch(deletePost(shopId,id)),history.push(`/${shopId}`))}>Delete This Post</button>
            </div>
            </div>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default EditPostForm;