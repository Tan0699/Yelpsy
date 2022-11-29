import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createShop } from "../../store/shops";
import './shoppo.css'

const ShopForm = ({ setSho }) => {
    const history = useHistory() // so that we can redirect after the image upload is successful
    const shopState = useSelector((state) => state.shops)
    const userState = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("image", image);
        payload.append("name", name)
        payload.append("description", description)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await dispatch(createShop(payload))
        if (res) {
            if (res.image) {
                // setSho(false);
                // await res.json();
                setImageLoading(false);
                // history.push("/");
                setSho(false);

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
            <div className="posttop">Anyone Can Become a Seller</div>
            <div className="posttop">Begin Your Journey Today!</div>
            <div  className="errors">
                {errors?.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <label className='wrapyo'>Image File</label>
            <input className="fileya"
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            <label className='wrapyo'>Shop Name</label>
            <input className="wrapya"
                // placeholder="Write name here"
                type="text"
                maxLength={20}
                // required pattern="[^A-Za-z$]+" title="Enter one word"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className='wrapyo'>Shop Description</label>
            <input className="wrapya"
                // placeholder="Write description here"
                type="text"
                maxLength={200}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="postsubwrap">
            <button className="postsub" type="submit">Start a Shop</button>
            </div>
            {(imageLoading) && <p>Loading...</p>}
        </form>
    )
}

export default ShopForm;