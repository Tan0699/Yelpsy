import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';


function Splash(){
const shopState = useSelector((state) => state.shops)
console.log("hmm",shopState)
const shops = Object.values(shopState)
const dispatch = useDispatch()
useEffect(()=>{
    dispatch(fetchShops())
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
    </>
  );
}

export default Splash;