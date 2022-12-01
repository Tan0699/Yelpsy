import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteShop, fetchOneShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import "./Oneshop.css"
import { Modal } from '../../context/Modal';
function OneShop() {
  const [editsho, setEditSho] = useState(false);
  const shopState = useSelector((state) => state.shops)
  const postState = useSelector((state) => state.posts)
  const thisUser = useSelector((state) => state.session.user)
  const shops = Object.values(shopState)
  const posts = Object.values(postState)
  const dispatch = useDispatch()
  const { shopId } = useParams()
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
  useEffect(() => {
    dispatch(fetchOneShop(shopId))
    dispatch(fetchPosts())
  }, [dispatch])


  const thisShopposts = posts?.filter(post => post.shop_id == +shopId)

  let editshopModal = (
    <div>
      <button className='editshobut' onClick={(e) => ((setEditSho(true)))}>Edit This Shop</button>
      {editsho && (
        <Modal onClose={() => setEditSho(false)}>
          <EditShopForm setEditSho={setEditSho} />
        </Modal>
      )}
    </div>)

  return (
    <>
    <div className='wpdiv'>
    <img className='newwp' src="https://freedesignfile.com/upload/2015/11/silver_christmas_background__vector_1460.png"></img></div>
    <div className='wholediv'>
      {/* <button onClick={() => (dispatch(deleteShop(shopId)), dispatch(fetchPosts()), history.push('/'))}>DELET</button> */}
      <div className='bgwrap'>
      </div>
        {/* <img className='bg' src="https://i.etsystatic.com/ishbs/3bfd46/3634706645/ishbs_3360x448.3634706645_3yxdbizc.jpg?version=0"></img> */}
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
        <div>
          {(thisUser?.id == thisShop?.user_id) &&
          <div>
        {editshopModal}</div>}
        </div>
      <div className='anoun'>
        <div>
          <div className='anountext'>Announcement</div>
          <div className='anounctext2'>Last updated on Sep 21, 2022</div>
        </div>
        <div>
          We are back in stock in practically everything! And to Celebrate our recent minestone of 10,000 sales, we are running a flash sale of %15 for just a week! :D So exciting! :D So check out the shop, All the pins are all here!
        </div>
      </div>
      <div className='gridwrappa'>
        <div className='fakecol'>
          <div className='item'>Items</div>
          <button className='fakesearch'>Search Unavailable</button>
          <div className='faker'>
            <div>All</div>
            <div>0</div></div>
          <div className='faker'>
            <div>On sale</div>
            <div>0</div></div>
          <div className='faker'>
            <div>Ghost Pins</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Hot and Fresh</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Colf and Frozen</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Dry and Salty</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Ghost Pins</div>
            <div>0</div></div>
            <div className='faker'>
            <div>High in Protein</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Vegetarian</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Gluten Free</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Organix</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Dairy Free</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Soupy</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Sandwich</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Desserts</div>
            <div>0</div></div>
            <div className='faker'>
            <div>Macarons</div>
            <div>0</div></div>
            <div className='faker'>
            <div>For Take-Out</div>
            <div>0</div></div>
            <div className='faker'>
            <div>You Can Afford</div>
            <div>0</div></div>
        </div>
        
        <div className='featured'>
          <div className='feat'>Featured</div>
        <div className='postwrapper'>
          {thisShopposts?.map((post) => (
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
        </div>
      </div>
      </div>
    </>
  );
}

export default OneShop;