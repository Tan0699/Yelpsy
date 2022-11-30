import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createShop, deleteShop, editShop, fetchOneShop } from "../../store/shops";


const EditShopForm = ({setEditSho}) => {
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
    const [image, setImage] = useState(thisShop?.image)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name",name)
        payload.append("description",description)
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);
    
        const res = await dispatch(editShop(payload,shopId))
        if (res) {
            if (res.image) {
            // await res.json();
            setImageLoading(false);
            setEditSho(false)
            // history.push("/");
        }
        else {
            // console.log(res)
            setImageLoading(false);
            // setEditSho(false)
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
            <div className="posttop">Begin Your Journey Today!</div>
            <div  className="errors">
                {errors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
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
            <label className='wrapyo'>Shop Name</label>
            <input className="wrapya"
            type="text"
            maxLength={20}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
           <label className='wrapyo'>Shop Description</label>
          <input className="wrapya"
            type="text"
            maxLength={200}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
           <div className="postsubwrap">
            <button className="postsub" type="submit">Edit Your Shop</button>
            <div className="deletwrap"> 
            <button className="delet" onClick={()=> (dispatch(deleteShop(shopId)),history.push('/'))}>Delete This Shop</button>
            </div></div>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default EditShopForm;