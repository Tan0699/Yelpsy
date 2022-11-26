import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchOneShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { NavLink, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import "./Oneshop.css"
function OneShop(){
const shopState = useSelector((state) => state.shops)
const postState = useSelector((state) => state.posts)
const thisUser = useSelector((state) => state.session.user)
const shops = Object.values(shopState)
const posts = Object.values(postState)
const dispatch = useDispatch()
const {shopId} = useParams()
const [users, setUsers] = useState([]);
const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/users/');
    const responseData = await response.json();
    setUsers(responseData.users);
  }
  fetchData();
}, []);
console.log("users",users)
const shopUser = users.filter(user => thisShop?.user_id == user.id)[0]
console.log("thisUser",shopUser)
useEffect(()=>{
    dispatch(fetchOneShop(shopId))
    dispatch(fetchPosts())
},[dispatch])


const thisShopposts = posts?.filter(post => post.shop_id == +shopId)
// console.log("THIS LMAO",thisShopposts)
return (
    <>
    <div className='bgwrap'>
    <img className='bg' src="https://img.freepik.com/premium-vector/christmas-background-various-complex-big-small-snowflakes-gray-white_444390-3700.jpg?w=1800"></img>
    <div className="bgdetails">
    <div className='shopdetail'>
    <img className='oneshopimg' src={thisShop?.image}></img>
    <div>{thisShop?.name}</div>
    <div>{thisShop?.description}</div>
    </div>
    
    <i class="fa-brands fa-hotjar"></i>
    <i class="fa-solid fa-truck-fast"></i>
    <div className='anonprof'>
    <img className='anon' src="https://i.kym-cdn.com/photos/images/newsfeed/001/878/329/dfa.jpg"></img>
    <div>{shopUser?.firstname}</div>
    <i class="fa-solid fa-envelopes-bulk"></i>
    </div>
    </div>
    </div>
    
    <div>THIS IS THE POSTS 
    {thisShopposts?.map((post)=>(
            <div key={post.id}>
                <NavLink to={`/${shopId}/posts/${post.id}`}>
                {post.name}
                <div>{post.price}</div>
                <img src={post.image}></img>
                </NavLink>
            </div>
        ))}
    </div>
    <PostForm/>
    </>
  );
}

export default OneShop;