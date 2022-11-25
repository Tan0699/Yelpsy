import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop,fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { useHistory, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { deletePost, fetchOnePost, fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import EditPostForm from '../EditPostform';

function OnePost(){
const {shopId,id} = useParams()
const shopState = useSelector((state) => state.shops)
const postState = useSelector((state) => state.posts)
const shops = Object.values(shopState)
const posts = Object.values(postState)
const history = useHistory()
const thisPost = posts.filter((post)=>post.id == +id)[0]
console.log("lamo",thisPost)
const dispatch = useDispatch()

useEffect(()=>{
    dispatch(fetchOnePost(shopId,id))
},[dispatch])

const thisShop = shops?.filter(shop => shop.id === +shopId)[0]
console.log("HNNGGG",posts)
const thisShopposts = posts?.filter(post => post.shop_id === +shopId)
// console.log("THIS LMAO",thisShopposts)
return (
    <>
{thisPost?.name}
<div>{thisPost?.description}</div>
<div>{thisPost?.price}</div>
<img src={thisPost?.image}></img>
<EditPostForm/>
<button onClick={()=> (dispatch(deletePost(shopId,id)),history.push(`/${shopId}`))}>DELET</button>
    </>
  );
}

export default OnePost;