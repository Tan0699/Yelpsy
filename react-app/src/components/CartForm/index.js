import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCartThunk } from "../../store/cart";
import { deletePost, editPost } from "../../store/posts";
import { createShop, editShop, fetchOneShop } from "../../store/shops";
import './cartform.css'

function CartForm ({thisPost})  {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1)
    const quantityArray = [1,2,3,4,5]
    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let i =0; i<quantity;i++){
        dispatch(addToCartThunk(thisPost))
        }
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
       
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
        <select
        className='count'
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        >
        {quantityArray?.map(number => (
            <option key={number.id}>
              {number}
            </option>
          ))}
          </select>
          <div className="addcartwrap">
            <button className="addcart" type="submit">Add to Cart
            </button></div>
        </form>
        </>
    )
}

export default CartForm;