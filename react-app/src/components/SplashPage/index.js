import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchPosts } from '../../store/posts';
import {  deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import './Splash.css'

function Splash() {
  const dispatch = useDispatch()
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
    
    const shuffledArray = posts.sort((a, b) => 0.5 - Math.random());
    const shuffledShops = shops.sort((a,b) => 0.5 - Math.random())
    

    useEffect(() => {
      dispatch(fetchShops())
      dispatch(fetchPosts())
      
      
    }, [dispatch])



  return (
    <>
    <div>
      <button onClick={()=> history.push("/purchases")}>PURRRCHASES</button>
      <button onClick={()=> history.push("/account")}>ACCOUNT PAGE</button>
    </div>
      {/* <div className='wpdiv'>
        <img className='newwp' src="https://i.ibb.co/S5DZC80/lepic.png"></img></div> */}
      <div className='color'>
        <div className='pink'>
          <div className='blanktext'>Enjoy the Holidays With Some Delicous Food!</div>
          <div className='blanktext'>Start By Checking Out These Shops</div>
        </div>
        <div className='cheke'>
          <div className='checkoutshop'></div>
        </div>
      </div>

      <div className='shopgrid'>
        {shuffledShops.filter((array, index) => index < 4).map((shop) => (
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
        {shuffledArray.filter((array, index) => index < 8).map(post => (
          <NavLink className="priceroo" onClick={() => window.scrollTo(0, 0)} to={`/${post.shop_id}/posts/${post.id}`}>
            <div className={`PostImageContainer${shuffledArray.indexOf(post)}`} key={post.id}>
              <div className='PostImage'>
                <img className={`pics`} src={post.image}
                ></img>
              </div>
              <div className='PostPriceWrap'>
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