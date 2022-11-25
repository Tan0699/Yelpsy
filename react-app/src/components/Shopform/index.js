import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createShop } from "../../store/shops";


const ShopForm = () => {
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state)=> state.users )
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name",name)
        payload.append("description",description)
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = dispatch(createShop(payload))
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
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
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default ShopForm;