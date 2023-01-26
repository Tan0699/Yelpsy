import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addToCartThunk, getAllcartThunk } from "../../store/cart";
import { deletePost, editPost, fetchPosts } from "../../store/posts";
import { clearAction, createShop, editShop, fetchOneShop, fetchShops } from "../../store/shops";
import AddedModal from "../AddedItemModal";
import { Modal } from '../../context/Modal';
import './Searched.css'
import { ClearSearchAction, searchPosts } from "../../store/search";
import Footer from "../Footer";
function Search() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { query } = useParams()
   const [isloaded, setisLoaded] = useState(false)
   const postState = useSelector(state => state.searches)
   const posts = Object.values(postState)
   const products = useSelector((state) => state?.cart.cart)
   useEffect(() => {
      Promise.all(
      [
         dispatch(searchPosts(query))]
      ).then(() => {
         setisLoaded(true)
         
       })
   }, [dispatch])
   useEffect(()=>{
      // dispatch(fetchPosts())
     
      dispatch(getAllcartThunk())
   },[dispatch])

   return ( isloaded &&
      
      <div className="wholewhole">
      <div className="wholesearchpage">
         {posts.length > 0 &&
         <div> 
            <div className="resultnumber">{posts.length} results for "{query}"</div>
            <div className="searchresultgrid">
               {posts?.map(post => (
                  <div className="singlesearch">
                     <NavLink to={`/${post.shop_id}/posts/${post.id}`}>
                     <img className="searchedimage" src={post.image}></img></NavLink>
                     <div className="searchedname"> {post.name}</div>
                     <div className="searchedprice">${post.price}</div>
                     {(products.filter(product=> product.id ==post.id)).length ==0  &&
                     <div className="searchedaddcart"><button onClick={()=>(dispatch(addToCartThunk(post)),history.push('/cart'))} className="searchedaddbutton">+ Add to cart</button></div>}
                     {(products.filter(product=> product.id ==post.id)).length > 0  &&
                     <div className="alreadyadded2"> 
                     Already added in cart! 
                     </div>
                     }
                     <div className="searchedshop">
                        <NavLink className={"morehere"} to={`/${post.shop_id}`}>
                        More from this shop 
                        </NavLink>
                        <i id="learrow" class="fa-solid fa-arrow-right"></i>
                        </div>
                  </div>
               ))}
               </div>
            </div>}
            </div>
         {posts.length == 0 &&
         <div className="wholesearchpage2">
            <div className="sorryno">
               <div className="noresult" >
                  Sorry, we coudln't find any results for {query}
               </div>
               <div className="tryelse">
                  Try searching for something else instead?
               </div>
            </div>
            </div>
         }
         
      {posts?.length == 0 &&
      <div><Footer/></div>
      }
      {/* <div>
      <Footer/>
      </div> */}
      </div>
   )
}

export default Search;