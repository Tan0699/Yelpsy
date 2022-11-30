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
    <div className='wpdiv'>
    <img className='newwp' src="https://freedesignfile.com/upload/2015/11/silver_christmas_background__vector_1460.png"></img></div>
    <div className='wholediv'>
      <div className='firstpostgrid'>
        <div className='firstgriddiv'>

          <img className='firstpostimg' src={thisPost?.image}></img>
          <button className='editposta'>Edit This Post</button>
          <div className='shoprev'> 0 Post Reviews ☆	☆	☆	☆	☆</div>
        </div>

        <div className='otherhalf'>
          
          <div className='posnam'>{thisPost?.name}</div>
          <div className='posdes'>{thisPost?.description}</div>
          <div className='pospri'>${thisPost?.price} + Shipping</div>
          <div className='shp'>Shipping Cost based on your Location: Free!</div>
          <div className='ooswrap'>
            <div className='oos'>CURRENTLY OUT OF STOCK</div>
          </div>
          <div >Sold By {shopUser?.firstname}</div>
          <div className='s1'>0 sales 	☆	☆	☆	☆	☆</div>
          <div>Like the Product? View more of this seller's posts here!</div>
          <div className='sellerbutwrap'>
            <NavLink className='yiyi' to={`/${shopId}`}>
              
                <img className='omago' src={thisShop?.image}></img>
                <div >{thisShop?.name}</div>
                </NavLink></div>
        </div>
      </div>
    <div className='secogrid'>
    <div></div>
    <div className='legri'>
      <div className='mojo'>
      <i id='moji' class="fa-solid fa-cart-shopping"></i>
      <div className='yaya'>Other people want this. Over 20 people have this in their carts right now.</div>
      </div>
      <div className='mojo'>
      <i  id='moji'  class="fa-solid fa-fire"></i>
      <div className='yaya'>Star Seller. This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any messages they received.</div>
      </div>
      <div className='mojo'>
      <i id='moji'  class="fa-solid fa-cart-shopping"></i>
      <div className='yaya'>Other people want this. Over 20 people have this in their carts right now.</div>
      </div>
      <div className='mojo'>
      <i  id='moji'  class="fa-solid fa-handshake"></i>
      <div className='yaya'>Etsy Purchase Protection: Shop confidently on Etsy knowing if something goes wrong with an order, we've got your back for all eligible purchases</div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default OnePost;