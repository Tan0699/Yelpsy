import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createPost } from "../../store/posts";
import { createShop } from "../../store/shops";
import './Postform.css'

const PostForm = ({setPos,setEditSho}) => {
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state)=> state.users )
    const postState = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const {shopId} = useParams()
    const [name, setName] = useState("")
    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [name3, setName3] = useState("")
    const [name4, setName4] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setName(`${name1}- ${name2}- ${name3}- ${name4}`)
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name",name)
        payload.append("description",description)
        payload.append("price",price)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
        const res = await dispatch(createPost(payload,shopId))
        
        if (res) {
            // await res.json();
            if(res.image){
                setImageLoading(false);
                setPos(false)
                setEditSho(false)
                // history.push("/");
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
        <form className="postformwrap" onSubmit={handleSubmit}>
          <div className="posttop">Have something to sell?</div>
          <div className="posttop">Make a Post!</div>
          <div className="errors">
        {errors?.map((error, ind) => (
          <div  className="errors" key={ind}>{error}</div>
        ))}
      </div>
 
      <label className='wrapyo'>Image File</label>
            <input className="fileya"
              type="file"
              accept="image/*"
              onChange={updateImage}
             
            />
            <label className='wrapyo'>Product Name</label>
            <input className="wrapya"
            // placeholder="Write name here"
            type="text"
            maxLength={30}
            required pattern="[a-zA-Z, 0-9,'. ! ? + @ # $ % ^ & * ( )]+" title="Please use valid chars,invalid chars: -"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
          <label className='wrapyo'>Alternate Product Name 1</label>
            <input className="wrapya"
            // placeholder="Write name here"
            type="text"
            maxLength={30}
            required pattern="[a-zA-Z, 0-9,'. ! ? + @ # $ % ^ & * ( )]+" title="Please use valid chars,invalid chars: -"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
          <label className='wrapyo'>Alternate Product Name 2</label>
            <input className="wrapya"
            // placeholder="Write name here"
            type="text"
            maxLength={30}
            required pattern="[a-zA-Z, 0-9,'. ! ? + @ # $ % ^ & * ( )]+" title="Please use valid chars,invalid chars: -"
            value={name3}
            onChange={(e) => setName3(e.target.value)}
          />
          <label className='wrapyo'>Alternate Product Name 3</label>
            <input className="wrapya"
            // placeholder="Write name here"
            type="text"
            maxLength={30}
            required pattern="[a-zA-Z, 0-9,'. ! ? + @ # $ % ^ & * ( )]+" title="Please use valid chars,invalid chars: -"
            value={name4}
            onChange={(e) => setName4(e.target.value)}
          />
          <label className='wrapyo'>Post Description</label>
          <input className="wrapya"
            // placeholder="Write description here"
            type="text"
            minLength={50}
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className='wrapyo'>Price</label>
          <input className="wrapyi"
            // placeholder="put price here"
            type="number"
            step=".01"
            min={1}
            max={999999}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
         <div className="postsubwrap">
            <button className="postsub" type="submit">Create a Post</button>
            </div>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default PostForm;