import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createPost } from "../../store/posts";
import { createShop } from "../../store/shops";


const PostForm = ({setPos}) => {
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state)=> state.users )
    const postState = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const {shopId} = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState(null)
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
        const res = await dispatch(createPost(payload,shopId))
        
        if (res) {
            // await res.json();
            if(res.image){
                setImageLoading(false);
                setPos(false)
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
        <form onSubmit={handleSubmit}>
          <div>
        {errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              required
            />
            <input
            placeholder="Write name here"
            type="text"
            maxLength={20}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Write description here"
            type="text"
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="put price here"
            type="number"
            step=".01"
            min={1}
            max={999999}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default PostForm;