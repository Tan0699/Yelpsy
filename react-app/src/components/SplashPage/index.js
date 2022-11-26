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
    <div className='color'>
      <div className='pink'>
        <div className='blanktext'>Up to 60% Off: Enjoy the Holidays With Some Delicous Food!</div>
      </div>
      <div></div>
    </div>
    <div className='shopgrid'>
    {shops?.map((shop)=>(
        <div className='inmap' key={shop.id}>
          <NavLink to={`/${shop.id}`}>
            <div className='imagename'>
            <img className='Image' src={shop.image}></img>
            <div className='justname'>{shop.name}</div>
            </div>
            </NavLink>
            
        </div>
    ))}</div>













    <div>POST SHOPS</div>
    <div>
      <ShopForm/>
    </div>
    <div className='postgrid'>
      {posts.map(post =>(
        <div className='PostImageContainer'>
          <div className='PostImage'>
          <img className='pics' src={post.image}></img>
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