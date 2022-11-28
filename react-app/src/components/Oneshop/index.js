import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchOneShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { NavLink, useHistory, useParams } from 'react-router-dom';
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
const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
const [users, setUsers] = useState([]);
const history = useHistory()
useEffect(() => {
  async function fetchData() {
    const response = await fetch('/api/users/');
    const responseData = await response.json();
    setUsers(responseData.users);
  }
  fetchData();
}, []);
const shopUser = users?.filter(user => thisShop?.user_id == user.id)[0]
useEffect(()=>{
    dispatch(fetchOneShop(shopId))
    dispatch(fetchPosts())
},[dispatch])


const thisShopposts = posts?.filter(post => post.shop_id == +shopId)
return (
    <>
    <button onClick={()=> (dispatch(deleteShop(shopId)),dispatch(fetchPosts()),history.push('/'))}>DELET</button>
    <div className='bgwrap'>
    <img className='bg' src="https://img.freepik.com/premium-vector/christmas-background-various-complex-big-small-snowflakes-gray-white_444390-3700.jpg?w=1800"></img>
    <div className="bgdetails">
    <div className='imgdesc'>
    <img className='oneshopimg' src={thisShop?.image}></img>
    <div className='shopdetail'>
    <div className='shopname'>{thisShop?.name}</div>
    <div className='shopdesc'>{thisShop?.description}</div>
    <div className='shopcountry'>California</div>
    <div className='starrating'>★★★★★ </div>
    </div>
    </div>
    <div className='freshdiv'>
    <i class="fa-brands fa-hotjar"></i>
    <div className='freshtext'> Fresh Ingredients made to order</div>
    </div>
    <div className='truckdiv'>
    <i class="fa-solid fa-truck-fast"></i>
    <div className='trucktext'>Free 1-day Shipping with orders oder $10!</div>
    </div>
    <div className='anonprof'>
    <img className='anon' src="https://i.kym-cdn.com/photos/images/newsfeed/001/878/329/dfa.jpg"></img>
    <div>{shopUser?.firstname}</div>
    <div className='contactinfo'>
    <i class="fa-solid fa-envelopes-bulk"></i>
    <div className='email'>{shopUser?.email}</div>
    </div></div>
    </div>
    </div>
    <div className='featured'>Featured Items</div>
    <div className='postwrapper'> 
    
    {thisShopposts?.map((post)=>(
            <div className='gridpost' key={post.id}>
                <NavLink className="postnav" to={`/${shopId}/posts/${post.id}`}>
                <img className='imgpost' src={post.image}></img>
                <div>{post.name}</div>
                <div>★★★★★(3223)</div>
                <div className='posprice'>${post.price}</div>
                <div className='est'>Est. arrival 6hrs from purchase</div>
                </NavLink>
            </div>
        ))}
    </div>
    </>
  );
}

export default OneShop;