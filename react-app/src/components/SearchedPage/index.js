import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addToCartThunk, getAllcartThunk } from "../../store/cart";
import { deletePost, editPost, fetchPosts } from "../../store/posts";
import { createShop, editShop, fetchOneShop, fetchShops } from "../../store/shops";
import AddedModal from "../AddedItemModal";
import { Modal } from '../../context/Modal';
import './Searched.css'
import { searchPosts } from "../../store/search";
function Search() {
   const dispatch = useDispatch()
   const { query } = useParams()
   const [isloaded, setisLoaded] = useState(false)
   const postState = useSelector(state => state.searches)
   const posts = Object.values(postState)
   useEffect(() => {
      Promise.all(
      [dispatch(searchPosts(query))]
      ).then(() => {
         setisLoaded(true)
       })
   }, [dispatch])
   // useEffect(()=>{
   //    dispatch(fetchPosts())
   // },[dispatch])

   return ( isloaded &&
      <div className="wholesearchpage">
         {posts.length > 0 &&
            <div className="searchresultgrid">
               {posts?.map(post => (
                  <div className="singlesearch">
                     <img className="searchedimage" src={post.image}></img>
                     <div className="searchedname"> {post.name}</div>
                     <div className="searchedprice">${post.price}</div>
                     <div className="searchedaddcart"><button>Add to cart</button></div>
                     <div className="searchedshop">More from this shop</div>
                  </div>
               ))}
            </div>}
         {posts.length == 0 &&
            <div className="sorryno">
               <div className="noresult" >
                  Sorry, we coudln't find any results for {query}
               </div>
               <div className="tryelse">
                  Try searching for something else instead?
               </div>
            </div>
         }
      </div>
   )
}

export default Search;