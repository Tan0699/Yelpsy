import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCartThunk, getAllcartThunk } from "../../store/cart";
import { deletePost, editPost, fetchPosts, searchPosts } from "../../store/posts";
import { createShop, editShop, fetchOneShop, fetchShops } from "../../store/shops";
import AddedModal from "../AddedItemModal";
import { Modal } from '../../context/Modal';
import './Searched.css'
function SearchBar ()  {
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    useEffect(() => {
     dispatch(searchPosts(query))
  }, [dispatch])
   
    return (
       <>
       </>
    )
}

export default SearchBar;