import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import { deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import './Splash.css'

function Splash(){
const shopState = useSelector((state) => state.shops)
const shops = Object.values(shopState)
const postState = useSelector((state) => state.posts)
const posts = Object.values(postState)
const dispatch = useDispatch()
const history = useHistory()
useEffect(()=>{
    dispatch(fetchShops())
    dispatch(fetchPosts())
},[dispatch])







  return (
    <>
    <div className='wpdiv'>
    <img className='newwp' src="https://freedesignfile.com/upload/2015/11/silver_christmas_background__vector_1460.png"></img></div>
    <div className='color'>
      <div className='pink'>
        <div className='blanktext'>Enjoy the Holidays With Some Delicous Food!</div>
      </div>
      <div className='cheke'>
      <div className='checkoutshop'>Check out these shops!</div>
      </div>
    </div>
    
    <div className='shopgrid'>
    {shops?.reverse().map((shop)=>(
        <div className='inmap' key={shop.id}>
          <NavLink className="navls" to={`/${shop.id}`}>
            <div className='imagename'>
            <img className='Image' src={shop.image}></img>
            <div className='justname'>{shop.name}</div>
            </div>
            </NavLink>
            
        </div>
    ))}</div>













    <div>POST SHOPS</div>
  
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