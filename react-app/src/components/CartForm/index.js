import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCartThunk } from "../../store/cart";
import { deletePost, editPost } from "../../store/posts";
import { createShop, editShop, fetchOneShop } from "../../store/shops";


function CartForm ({thisPost})  {
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addToCartThunk(thisPost))
       
    
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
       
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <button type="submit">Add to Cart
            </button>
        </form>
        </>
    )
}

export default CartForm;