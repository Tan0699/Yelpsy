import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchOneShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { fetchPosts } from '../../store/posts';
import PostForm from '../Postform';

function OneShop(){
const shopState = useSelector((state) => state.shops)
const postState = useSelector((state) => state.posts)
const shops = Object.values(shopState)
const posts = Object.values(postState)
const dispatch = useDispatch()
const {shopId} = useParams()
useEffect(()=>{
    dispatch(fetchOneShop(shopId))
    dispatch(fetchPosts())
},[dispatch])

const thisShop = shops?.filter(shop => shop.id === +shopId)[0]
console.log("HNNGGG",posts)
const thisShopposts = posts?.filter(post => post.shop_id === +shopId)
// console.log("THIS LMAO",thisShopposts)
return (
    <>

    
    <div>{thisShop?.name}</div>
    <div>{thisShop?.description}</div>
    <img src={thisShop?.image}></img>
    <div>EDITTING THIS SHOP
        <EditShopForm/>
    </div>
    <div>THIS IS THE POSTS 
    {thisShopposts?.map((post)=>(
            <div key={post.id}>
                {post.name}
                <div>{post.price}</div>
                <img src={post.image}></img>
            </div>
        ))}
    </div>
    <PostForm/>
    </>
  );
}

export default OneShop;