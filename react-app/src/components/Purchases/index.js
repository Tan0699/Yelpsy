import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { fetchPosts } from '../../store/posts';
import { fetchPurchases } from '../../store/purchases';
import shopReducer, { deleteShop, fetchShops } from '../../store/shops';
import EditShopForm from '../EditShopform';
import ReviewForm from '../ReviewForm';
import ShopForm from '../Shopform';
import StarThing from '../Star';
import './Purchase.css'

function Purchases() {
  const shopState = useSelector((state) => state.shops)
  const thisUser = useSelector((state) => state.session.user)
  const shops = Object.values(shopState)
  const postState = useSelector((state) => state.posts)
  const purchaseState = useSelector((state) => state.purchase)
  // const details = useSelector((state) => state?.purchase?.details)
  // const details = Object.values(detailsState)
  // console.log("detailSSS",details)
  const purchases = Object.values(purchaseState)
  const posts = Object.values(postState)
  const dispatch = useDispatch()
  const history = useHistory()
  const [revi, setrevi] = useState(false);
  const [currentpost, setcurrentpost] = useState("")
  useEffect(() => {
    dispatch(fetchShops())
    dispatch(fetchPosts())
    dispatch(fetchPurchases(thisUser?.id))
  }, [dispatch])
  console.log("state", purchaseState)

  // const shopArray = []

  // const unfilteredShopArray = details?.map(detail => {
  //  const filteredPos= posts.filter(post => detail.post_id == post.id )[0]
  //  const filteredShop = shops.filter(shop => shop.id == filteredPos.shop_id)[0]
  //  if (!(shopArray.includes(filteredShop.name))){
  //   shopArray.push(filteredShop.name)
  //  }
  // })
  // console.log("shop array",shopArray)
  //   let yoo = (
  //     <div>
  //       <button className='editshobut' onClick={(e) => ((setrevi(true)))}>Edit This Shop</button>
  //       {revi && (
  //         <Modal onClose={() => setrevi(false)}>
  //           <EditShopForm setrevi={setrevi} />
  //         </Modal>
  //       )}
  //     </div>)

  return (
    <>
      <div className='wholewrap'>
        <div className='onewordwrap'>
          <div className='oneword'>
            Purchases and Reviews
          </div>
        </div>

        {purchases.map(purchase => (
          <div className='purchasegrid'>


            <div className='purchasedetailsgrid'>
              <div className='purchasedetailsgrid1'>
                <div className='purchasedetailsgrid1inner'>
                  Purchased from shop(s)
                  <NavLink to={`/${shops?.filter(shop => (
                    posts?.filter(post => (
                      post?.id == purchase?.details[0]?.post_id)))[0]?.shop_id == shop?.id)[0]?.id}`}>
                    {shops?.filter(shop => (
                      posts?.filter(post => (
                        post?.id == purchase?.details[0]?.post_id)))[0]?.shop_id == shop?.id)[0]?.name}</NavLink>... on {purchase.created_at.slice(4, 16)}
                </div>
                <div>
                  ${purchase.total_price}
                </div>
              </div>
              <div className='purchasedetailswrap'>
                {purchase.details.map(detail => (
                  <div className='purchasedetailsgrid2'>
                    <div className='purchasedetailsimage'>
                      <img className='detailimage' src={posts.filter(post => detail.post_id == post.id)[0]?.image}>
                      </img>
                    </div>

                    <div className='purchasedetailsinfo'>
                      <div>
                        {posts.filter(post => detail.post_id == post.id)[0]?.name}
                      </div>
                      <div className='starthing'>
                        {/* <div class="rating">
                          <input type ="radio" name="star" id="star1"/>
                          <label for="star1"></label>
                          <input type ="radio" name="star" id="star2"/>
                          <label for="star2"></label>
                          <input type ="radio" name="star" id="star3"/>
                          <label for="star3"></label>
                          <input type ="radio" name="star" id="star4"/>
                          <label for="star4"></label>
                          <input type ="radio" name="star" id="star5"/>
                          <label for="star5"></label>
                          </div> */}
                          <div>
                          <StarThing/>
                          </div>
                      </div>

                      <div className='buyaganplusprice'>
                        <div>Buy this Again button</div>
                        <div>${posts.filter(post => detail.post_id == post.id)[0]?.price}</div>
                      </div>

                    </div>






                  </div>))}
              </div>
            </div>
            <div className='reviewbuttongrids'>
              <div className='process'>
                Processed
              </div>
              <div className='lebuttons'>
                <button className='rebuy'>Repurchase</button>
              </div>
              <div className='lebuttons'>
                <button className='viewrev'>
                  View Review
                </button>
              </div>
              <div  className='lebuttons'>
                <button className='editdetailrev'>Edit Review</button>
              </div>
            </div>

          </div>
        ))}










        <div> {revi && (
          <Modal onClose={() => setrevi(false)}>
            <ReviewForm posts={posts} currentpost={currentpost} />
          </Modal>
        )}</div>
      </div>
    </>
  );
}

export default Purchases;