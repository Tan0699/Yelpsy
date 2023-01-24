import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { addToCartThunk, getAllcartThunk } from "../../store/cart";
import { deletePost, editPost, fetchPosts, searchPosts } from "../../store/posts";
import { createShop, editShop, fetchOneShop, fetchShops } from "../../store/shops";
import AddedModal from "../AddedItemModal";
import { Modal } from '../../context/Modal';
import './Searched.css'
function SearchBar ()  {
   const history = useHistory()
    const dispatch = useDispatch()
    const [query, setQuery] = useState("")
    const postState = useSelector(state => state.posts)
    const posts = Object.values(postState)
    const matchingPost = (query,posts) =>{
      if(!query) return null
     return posts.filter(post => post.name.toLowerCase().includes(query.toLowerCase()))
  
    }
    const postsFound = matchingPost(query,posts)
  //   useEffect(() => {
  //    dispatch(searchPosts(query))
  // }, [dispatch])
  const handleSubmit = async (e) => {
   history.push(`/search/${query}`)
   setQuery("")
  }
  const handleUserInput = (e) => {
    setQuery(e.target.value);
  };
  useEffect(()=>{
    dispatch(fetchPosts())
  },[dispatch])
    return (
      <div className="biggestsearchwrap">
      <form className="bigsearchform" onSubmit={handleSubmit}>
      <input className="bigsearchbar"
      id="search"
      type="text"
      placeholder="Search for Products Here"
      value={query}
      onChange={handleUserInput}
      />
      <button className='bigsearchbutton' type="submit"><i class="fa fa-search"></i></button>
    </form>
    <div className="searchresults">
        {postsFound &&
          <div className="searchResults">
            {postsFound?.filter((array, index) => index < 12).map((post) =>(
               <div className="innerresult">
              <NavLink className={"searcheroo"} onClick={()=> (setQuery(""))} to={`/${post?.shop_id}/posts/${post?.id}`}>
              <div className="individualresult" key={post.id}>{post.name}</div>
              </NavLink>
              </div>
            ))}
          </div>
          }
          {postsFound?.length==0 &&
          <div className="searchResults">
               <div className="innerresult">
               <NavLink className={"searcheroo"} onClick={()=> (setQuery(""))} to={`/search/${query}`}>
              <div className="individualresult">Cannot find products containing "{query}"</div>
              </NavLink>
              </div>
          </div>
          }
        </div>
    </div>
    )
}

export default SearchBar;