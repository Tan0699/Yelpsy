import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShops } from '../../store/shops';


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
            {shop.name}
            {shop.description}
        </div>
    ))}
    </>
  );
}

export default Splash;