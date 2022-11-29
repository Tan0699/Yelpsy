import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { deletePost, fetchOnePost, fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import EditPostForm from '../EditPostform';
import "./Onepost.css"
function OnePost() {
  const { shopId, id } = useParams()
  const shopState = useSelector((state) => state.shops)
  const postState = useSelector((state) => state.posts)
  const shops = Object.values(shopState)
  const posts = Object.values(postState)
  const history = useHistory()
  const thisPost = posts.filter((post) => post.id == +id)[0]
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
  useEffect(() => {
    dispatch(fetchOnePost(shopId, id))
    dispatch(fetchShops())
  }, [dispatch])
  const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
  const thisShopposts = posts?.filter(post => post.shop_id === +shopId)
  return (
    <>
      <div className='firstpostgrid'>
        <div className='firstgriddiv'>

          <img className='firstpostimg' src={thisPost?.image}></img>
          <button className='editposta'>EDIT THIS POST</button>
          <div className='shoprev'> 0 Post Reviews ☆	☆	☆	☆	☆</div>
        </div>

        <div className='otherhalf'>
          <div >Sold By {shopUser?.firstname}</div>
          <div className='s1'>0 sales 	☆	☆	☆	☆	☆</div>
          <div>Like the Product? View more of this seller's posts here!</div>
          <div className='sellerbutwrap'>
            <NavLink to={`/${shopId}`}>
              <button className='sellerbut'>{thisShop?.name}</button></NavLink></div>
          <div className='posnam'>{thisPost?.name}</div>
          <div className='posdes'>{thisPost?.description}</div>
          <div className='pospri'>${thisPost?.price} + Shipping</div>
          <div className='shp'>Shipping Cost based on your Location: Free!</div>
          <div className='ooswrap'>
            <div className='oos'>CURRENTLY OUT OF STOCK</div>
          </div>
        </div>
      </div>

    </>
  );
}

export default OnePost;