import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCartThunk, getAllcartThunk } from "../../store/cart";
import { deletePost, editPost, fetchPosts } from "../../store/posts";
import { createShop, editShop, fetchOneShop, fetchShops } from "../../store/shops";
import './cartform.css'

function CartForm ({thisPost})  {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllcartThunk())
      dispatch(fetchPosts())
  }, [dispatch])
    const products = useSelector((state) => state?.cart.cart)
    
    const [quantity, setQuantity] = useState(1)
    const quantityArray = [1,2,3,4,5,6,7,8,9,10]
    const dupeProduct = products?.filter(product => product?.id ==thisPost?.id)
    console.log("this post",thisPost)
    console.log("ledupe",dupeProduct)
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
            {dupeProduct.length==0 &&
            <button className="addcart" type="submit">Add to Cart
            </button>}
            {dupeProduct.length>0 &&
            <div >
            <div className="alreadyadded">This Item Has Already Been Added to Your Cart</div>
            <button disabled={true} className="addcartnono">Add to Cart
            </button></div>}
            </div>
        </form>
        </>
    )
}

export default CartForm;