import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAction, deleteShop, fetchShops } from '../../store/shops';
import ShopForm from '../Shopform';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import EditShopForm from '../EditShopform';
import { deletePost, fetchOnePost, fetchPosts } from '../../store/posts';
import PostForm from '../Postform';
import EditPostForm from '../EditPostform';
import "./Onepost.css"
import { Modal } from '../../context/Modal';
import CartForm from '../CartForm';
import { deleteFromCartThunk } from '../../store/cart';
import { fetchReviews } from '../../store/reviews';
import AddedModal from '../AddedItemModal';
import RevForm2 from '../ReviewForm/Rev2';
import { fetchPurchases } from '../../store/purchases';


function OnePost() {
  const { shopId, id } = useParams()
  const [revi, setrevi] = useState(false);
  const thisUser = useSelector((state) => state.session.user)
  const shopState = useSelector((state) => state.shops)
  const postState = useSelector((state) => state.posts)
  const revState = useSelector((state) => state.reviews)
  const shops = Object.values(shopState)
  const posts = Object.values(postState)
  const reviews = Object.values(revState)
  const [editpos, setEditPos] = useState(false)
  const history = useHistory()
  const thisPost = posts.filter((post) => post.id == +id)[0]
  const thisPostRevs = reviews?.filter((reviews) => thisPost?.id == reviews?.post_id)
  const myRevs = reviews?.filter((reviews) => thisUser.id == reviews?.user_id)
  const myRevsHere = myRevs?.filter((reviews) => thisPost?.id == reviews?.post_id)
  let initial = 0
  thisPostRevs.forEach(rev => initial = initial + rev.rating)
  const avgrating = initial / thisPostRevs.length
  const purchaseState = useSelector((state) => state.purchase)
  const purchased = []
  const purchases = Object.values(purchaseState)
  purchases?.forEach(purchase => {
    purchase?.details?.forEach(purchasy => {
      if(purchasy.post_id == id){
        purchased.push(purchasy)
      }
    })
  })
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
    dispatch(fetchReviews())
    dispatch(fetchPurchases(thisUser?.id))
  }, [dispatch])

  console.log("huhu why no work", thisUser?.id)
  console.log("huhu why no work", thisPost?.user_id)
  const thisShop = shops?.filter(shop => shop.id == +shopId)[0]
  
  const thisShopposts = posts?.filter(post => post.shop_id === +shopId)
 
  let editpostModal = (
    <div>
      <button className='editposta' onClick={(e) => ((setEditPos(true)))}>Edit This Post</button>
      {editpos && (
        <Modal onClose={() => setEditPos(false)}>
          <EditPostForm setEditPos={setEditPos} />
        </Modal>
      )}
    </div>)
  return (
    <>
      {/* <div className='wpdiv'>
    <img className='newwp' src="https://i.ibb.co/S5DZC80/lepic.png"></img></div> */}
      <div className='wholediv'>
        <div className='firstpostgrid'>
          <div className='firstgriddiv'>

            <img className='firstpostimg' src={thisPost?.image}></img>
            {(thisUser?.id == thisPost?.user_id) &&
              <div>{editpostModal}</div>}
            {thisPostRevs.length == 0 &&
              <span className='shoprev'>0 Reviews <i id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating < .51 && avgrating > 0 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-regular fa-star-half-stroke"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > .51 && avgrating < 1.01 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 1.01 && avgrating < 1.51 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star-half-stroke"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 1.51 && avgrating < 2.01 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 2.01 && avgrating < 2.51 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star-half-stroke"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 2.51 && avgrating < 3.01 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 3.01 && avgrating < 3.51 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star-half-stroke"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 3.51 && avgrating < 4.01 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star"></i></span>
            }
            {avgrating > 4.01 && avgrating < 4.51 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-regular fa-star-half-stroke"></i></span>
            }
            {avgrating > 4.51 &&
              <span className='shoprev'>{thisPostRevs.length} Reviews <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i>
                <i  id='stara' class="fa-solid fa-star"></i> </span>
            }
              <div className='revforitemwrap'>
                <div className='revforitem'>Reviews for this item</div>
                <div>Reviews for this shop(WIP)</div>
              </div>
              <div className='lelinewrap'>
              <div className='leline'></div></div>
              {purchased.length>0 && myRevsHere.length==0 &&
              <div className='rev2button'>
              <button className='editposta' onClick={(e) => ((setrevi(true)))}>Leave a Review</button>
                 {revi && (
          <Modal onClose={() => setrevi(false)}>
            <RevForm2 shops={shops} posts={posts} thisUser={thisUser} setrevi={setrevi}/>
          </Modal>
        )}</div>}
            <div>
              {thisPostRevs?.map((review) => (
                <div className='revvy'>
                  {review.rating == 1 &&
                    <span  class="starrating"><i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i></span>}
                  {review.rating == 2 &&
                    <span class="starrating"><i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i></span>}
                  {review.rating == 3 &&
                    <span class="starrating"><i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i></span>}
                  {review.rating == 4 &&
                    <span class="starrating"><i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-regular fa-star"></i></span>}
                  {review.rating == 5 &&
                    <span class="starrat"><i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i>
                      <i id="staro" class="fa-solid fa-star"></i></span>}
                  <div className='revdesc'> {review.description}</div>
                  <div className='reviewuserwrap'>
                    <div>{users.map(user => (
                      <div className='proffpwrap'>
                        {user.id == review.user_id &&
                          <img className='proffp' src={user?.image}></img>
                        }
                      </div>
                    ))}</div>
                    <div className='revuser'>{users.map(user => (
                      <div>
                        {user.id == review.user_id &&
                          <div>{user.firstname}</div>}
                      </div>
                    ))}</div>
                    <div className='revuser'>{review.created_at.slice(0, 16)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='otherhalf'>
            <NavLink className='yiyi' to={`/${shopId}`}>

              {/* <img className='omago' src={thisShop?.image}></img> */}

              <div className='thisshopname' >{thisShop?.name}</div>
            </NavLink>
            
            <div className='s1'><img className='sta' src="/sta.png"/>0 sales 	☆	☆	☆	☆	☆</div>
            <div className='posnam'>{thisPost?.name}</div>
            <div className='pospri'>${thisPost?.price} </div>
            <div className='quantity'>Quantity</div>
            <div className='cartform'><CartForm thisPost={thisPost} thisShopposts={thisShopposts} /></div>
            <div className='shp'>Shipping Cost based on your Location: Free!</div>
            <div className='legri'>
              {/* <div className='mojo'>
      <i id='moji' class="fa-solid fa-cart-shopping"></i>
      <div className='yaya'>Other people want this. Over 20 people have this in their carts right now.</div>
      </div> */}
              <div className='mojo1'>
                <i id='moji' class="fa-solid fa-fire"></i>
                <div className='yaya'><strong> Star Seller.</strong> This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any messages they received.</div>
              </div>
              <div className='mojo2'>
                <i id='moji' class="fa-solid fa-cart-shopping"></i>
                <div className='yaya'><strong> Selling Fast! </strong>Other people want this. Over 20 people have this in their carts right now.</div>
              </div>
              <div className='mojo'>
                <i id='moji' class="fa-solid fa-handshake"></i>
                <div className='yaya'><strong>Etsy Purchase Protection:</strong> Shop confidently on Etsy knowing if something goes wrong with an order, we've got your back for all eligible purchases</div>
              </div>
            </div>
            <div className='descripto'>Description</div>
            <div className='posdes'>{thisPost?.description}</div>
            <div className='carbon'>Yelpsy offsets carbon emissions from shipping and packaging on this purchase.</div>
            <div className='ooswrap'>
            </div>
            
          </div>

        </div>

        <div className='secogrid'>

          

        </div>
      </div>
    </>
  );
}

export default OnePost;