import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchPosts, fetchRandomPosts } from '../../store/posts';
import {  clearAction, deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import './Splash.css'

function Splash() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearAction())
    dispatch(fetchShops())
    dispatch(fetchRandomPosts())
   
    
  }, [dispatch])
  const isUser = useSelector((state)=> state.session.user)
  const shopState = useSelector((state) => state.shops)
  const shops = Object.values(shopState)
  const postState = useSelector((state) => state.posts)
  const posts = Object.values(postState)
  const history = useHistory()
  
  
  // const array = []
  // console.log("aaray",array)
  // for ( let i = 0 ;i<=100 ; i++){
    //  let random = Math.floor(Math.random()*posts.length)
    //  if (!(array.includes(posts[random]))){
      //   console.log("random",random)
      //   array.push(posts[random])
      //  }
      //  if(array.length ==8){
        //  break
        //  }
        // }
    
        
      
        // posts.sort((a,b) => 0.5 - Math.random());
        // shops.sort((a,b) => 0.5 - Math.random())
        
        
      
        
        return (
          <>
    <div>
      <button onClick={()=> history.push("/purchases")}>PURRRCHASES</button>
      <button onClick={()=> history.push("/cart")}>CART PAGE</button>
    </div>
      {/* <div className='wpdiv'>
        <img className='newwp' src="https://i.ibb.co/S5DZC80/lepic.png"></img></div> */}
      <div className='color'>
        <div className='pink'>
          {!isUser &&
          <div className='blanktextwrap'>
          <div className='blanktext'>Enjoy the Holidays With Some Delicous Food!</div></div>
          }
          {isUser &&
          <div className='blanktextwrap'>
          <div className='blanktext'>Welcome back, {isUser.firstname}!</div></div>}
        </div>
        <div className='cheke'>
          <div className='checkoutshop'></div>
        </div>
      </div>

      <div className='shopgrid'>
        {shops.filter((array, index) => index < 4).map((shop) => (
          <div className='inmap' key={shop.id}>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="navls" to={`/${shop.id}`}>
              <div className='imagename'>
                <img className='Image' src={shop.image}></img>
                <div className='justname'>{shop.name}</div>
              </div>
            </NavLink>

          </div>
        ))}</div>













      {/* <div>POST SHOPS</div> */}

      <div className='postgrid'>
        {posts.filter((array, index) => index < 8).map(post => (
          <NavLink className="priceroo" onClick={() => window.scrollTo(0, 0)} to={`/${post.shop_id}/posts/${post.id}`}>
            <div className={`PostImageContainer${posts.indexOf(post)}`} key={post.id}>
              <div className='PostImage'>
                <img className={`pics`} src={post.image}
                ></img>
              </div>
              <div className={`PostPriceWrap${posts.indexOf(post)}`}>
                <div className='Price'>${post.price}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Splash;