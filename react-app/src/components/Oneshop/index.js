import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchOneShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';

function OneShop(){
const shopState = useSelector((state) => state.shops)
const shops = Object.values(shopState)
const dispatch = useDispatch()
const {shopId} = useParams()
useEffect(()=>{
    dispatch(fetchOneShop(shopId))
},[dispatch])
const thisShop = shops?.filter(shop => shop.id === +shopId)[0]
  return (
    <>
    {thisShop?.name}
    {thisShop?.description}
    <img src={thisShop?.image}></img>
    <div>EDITTING THIS SHOP
        <EditShopForm/>
    </div>
    </>
  );
}

export default OneShop;