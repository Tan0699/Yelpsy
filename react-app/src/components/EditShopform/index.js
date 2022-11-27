import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createShop, editShop, fetchOneShop } from "../../store/shops";


const EditShopForm = () => {
    const {shopId} = useParams()
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state)=> state.users )
    const shops = Object.values(shopState)
    const thisShop = shops?.filter(shop => shop.id === +shopId)[0]
    const dispatch = useDispatch()
    const [name, setName] = useState(thisShop?.name)
    const [description, setDescription] = useState(thisShop?.description)
    const [appear,setAppear] =useState(false)
    const [appear2,setAppear2] =useState(true)
    console.log("yayya",thisShop?.image)
    const [image, setImage] = useState(thisShop?.image)
    const [imageLoading, setImageLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("psssdfs")
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name",name)
        payload.append("description",description)
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
    
        const res = dispatch(editShop(payload,shopId))
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
            {appear2 &&
            <button onClick={()=>(setAppear(true),setAppear2(false))}>Select a New Image</button>}
            {appear &&
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              
            />}
            <input
            type="text"
            maxLength={20}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
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

export default EditShopForm;