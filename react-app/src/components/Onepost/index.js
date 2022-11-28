import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop,fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { useHistory, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { deletePost, fetchOnePost, fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import EditPostForm from '../EditPostform';
import "./Onepost.css"
function OnePost(){
const {shopId,id} = useParams()
const shopState = useSelector((state) => state.shops)
const postState = useSelector((state) => state.posts)
const shops = Object.values(shopState)
const posts = Object.values(postState)
const history = useHistory()
const thisPost = posts.filter((post)=>post.id == +id)[0]
const dispatch = useDispatch()
const [users, setUsers] = useState([]);
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/users/');
    const responseData = await response.json();
    setUsers(responseData.users);
  }
  fetchData();
}, []);
const shopUser = users?.filter(user => thisPost?.user_id == user.id)[0]
useEffect(()=>{
    dispatch(fetchOnePost(shopId,id))
    dispatch(fetchShops())
},[dispatch])
const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
const thisShopposts = posts?.filter(post => post.shop_id === +shopId)
return (
    <>
    <div className='firstpostgrid'>
    <img  className='firstpostimg' src={thisPost?.image}></img>
    <div>
        <div>Seller:{shopUser?.firstname}</div>
        <div>{thisShop?.name}</div>
{thisPost?.name}
<div>{thisPost?.description}</div>
<div>{thisPost?.price}</div>
<button onClick={()=> (dispatch(deletePost(shopId,id)),history.push(`/${shopId}`))}>DELET</button></div></div>
    </>
  );
}

export default OnePost;