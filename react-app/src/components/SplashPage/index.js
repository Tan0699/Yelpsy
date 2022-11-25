import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import './Splash.css'

function Splash(){
const shopState = useSelector((state) => state.shops)
console.log("hmm",shopState)
const shops = Object.values(shopState)
const postState = useSelector((state) => state.posts)
const posts = Object.values(postState)
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(fetchShops())
    dispatch(fetchPosts())
},[dispatch])







  return (
    <>
    <div>Shops</div>
    {shops?.map((shop)=>(
        <div key={shop.id}>
          <NavLink to={`/${shop.id}`}>
            {shop.name}
            {shop.description}
            <img src={shop.image}></img>
            </NavLink>
            <button onClick={()=>dispatch(deleteShop(shop.id))}>DELETE</button>
        </div>
    ))}
    <div>POST SHOPS</div>
    <div>
      <ShopForm/>
    </div>
    <div>
      {posts.map(post =>(
        <div className='PostImageContainer'>
          <div className='PostImage'>
          <img className='Image' src={post.image}></img>
          </div>
          <div className='PostPriceWrap'>
          <div className='Price'>{post.price}</div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Splash;