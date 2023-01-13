import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { fetchPosts } from '../../store/posts';
import { fetchPurchases } from '../../store/purchases';
import { deleteReview, fetchReviews } from '../../store/reviews';
import shopReducer, { deleteShop, fetchShops } from '../../store/shops';
import EditShopForm from '../EditShopform';
import ReviewEditForm from '../ReviewEditForm';
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
  const reviewstate = useSelector((state) => state.reviews)
  const reviews = Object.values(reviewstate)
  const filteredReviews = reviews?.filter(review => review?.user_id == thisUser?.id)
  console.log("filtere revs ", filteredReviews)
  // const details = useSelector((state) => state?.purchase?.details)
  // const details = Object.values(detailsState)
  // console.log("detailSSS",details)
  const purchases = Object.values(purchaseState)
  const posts = Object.values(postState)
  const dispatch = useDispatch()
  const history = useHistory()
  const [editrevi, setedirevi] = useState(false)
  const [revi, setrevi] = useState(false);
  const [star, setStar] = useState(0)
  const [currentpost, setcurrentpost] = useState("")
  useEffect(() => {
    dispatch(fetchReviews())
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
      <div className='onewordwrap'>
        <div className='oneword'>
          Purchases and Reviews
        </div>
      </div>
      <div className='alinewrap'>
        <div className='aline'></div></div>

      <div className='wholewrap'>
        {purchases.map(purchase => (
          <div className='purchasegrid'>


            <div className='purchasedetailsgrid'>
              <div className='purchasedetailsgrid1'>
                <div className='purchasedetailsgrid1inner'>
                  Purchased from shop(s) { }
                  <NavLink className="purchasefrom" to={`/${shops?.filter(shop => (
                    posts?.filter(post => (
                      post?.id == purchase?.details[0]?.post_id)))[0]?.shop_id == shop?.id)[0]?.id}`}>
                    {shops?.filter(shop => (
                      posts?.filter(post => (
                        post?.id == purchase?.details[0]?.post_id)))[0]?.shop_id == shop?.id)[0]?.name}</NavLink>... on {purchase.created_at.slice(4, 16)}
                </div>
                <div className='pricio'>
                  ${purchase.total_price} - 10% = <b>${(purchase.total_price/1.111111111111111111).toFixed(2)}</b>
                </div>
              </div>
              <div className='purchasedetailswrap'>
                {purchase.details.map(detail => (
                  <div className='purchasedetailsgrid2'>
                    <div className='detailimagewrap'>
                      <div className='purchasedetailsimage'>
                        <img className='detailimage' src={posts.filter(post => detail.post_id == post.id)[0]?.image}>
                        </img>
                      </div></div>

                    <div className='purchasedetailsinfo'>
                      <div className='purchasenam'>
                        {posts.filter(post => detail.post_id == post.id)[0]?.name}
                      </div>
                      {filteredReviews?.filter(review => (review.post_id == detail.post_id)).length > 0 &&
                        <div className='starthing2'>
                          <div className='yourevwrap'>
                            <div className='yourevwrap2'>
                              <div className='yourev'>Your Review</div></div>
                            {filteredReviews.filter(review => review.post_id == detail.post_id)[0].rating == 1 &&
                              <div className='blust'>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                              </div>}
                            {filteredReviews.filter(review => review.post_id == detail.post_id)[0].rating == 2 &&
                              <div className='blust'>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                              </div>}
                            {filteredReviews.filter(review => review.post_id == detail.post_id)[0].rating == 3 &&
                              <div className='blust'>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                              </div>}
                            {filteredReviews.filter(review => review.post_id == detail.post_id)[0].rating == 4 &&
                              <div className='blust'>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='blusta'>
                                  <input type="radio" name="star" id="star1" /></div>
                              </div>}
                            {filteredReviews.filter(review => review.post_id == detail.post_id)[0].rating == 5 &&
                              <div className='blust'>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                                <div className='greensta'>
                                  <input type="radio" name="star" id="star1" /></div>
                              </div>}
                              <div className='daterwrap'>
                              <div>{filteredReviews.filter(review => review.post_id == detail.post_id)[0].created_at.slice(4,17)}</div></div>
                          </div>
                          <div className='filterdesc'>{filteredReviews.filter(review => review.post_id == detail.post_id)[0].description}</div>
                          <div className='bothrevwrap'>
                          <div className='revfr' onClick={e => (setedirevi(true), setcurrentpost(detail.post_id))}>Edit this Review</div>
                          <div className='revfrdeletewrap'>
                          <div className='revfrdelete' onClick={e => (dispatch(deleteReview(filteredReviews.filter(review => review.post_id == detail.post_id)[0].id)))}>Delete this Review</div></div></div>
                        </div>}
                      {filteredReviews?.filter(review => (review.post_id == detail.post_id)).length == 0 &&

                        <div className='starthing'>
                          <div className='starthinginnerwrap'>
                            <div className='starthinginner'>Review this product</div>
                            </div>
                          <div className='starthinginner2'>
                            <div class="rating">
                              <input
                                type="radio"
                                // name={`star${detail.id}`}
                                name="star"
                                id="star1"
                                value={5}
                                onClick={e => (setrevi(true), setcurrentpost(detail.post_id))}
                                onChange={e => (setStar(e.target.value))}
                                defaultChecked={star == 5}
                              />

                              <input
                                type="radio"
                                // name={`star${detail.id}`}

                                name="star" id="star2"
                                value={4}
                                onClick={e => (setrevi(true), setcurrentpost(detail.post_id))}
                                onChange={e => (setStar(e.target.value))}
                                defaultChecked={star == 4}
                              />

                              <input
                                type="radio"
                                // name={`star${detail.id}`}
                                name="star"
                                id="star3"
                                value={3}
                                onClick={e => (setrevi(true), setcurrentpost(detail.post_id))}
                                onChange={e => (setStar(e.target.value))}
                                defaultChecked={star == 3}
                              />

                              <input
                                type="radio"
                                //  name={`star${detail.id}`}

                                name="star" id="star4"
                                value={2}
                                onClick={e => (setrevi(true), setcurrentpost(detail.post_id))}
                                onChange={e => (setStar(e.target.value))}
                                defaultChecked={star == 2}
                              />

                              <input
                                type="radio"
                                // name={`star${detail.id}`}
                                name="star"
                                id="star5"
                                value={1}
                                onClick={e => (setrevi(true), setcurrentpost(detail.post_id))}
                                onChange={e => (setStar(e.target.value))}
                                defaultChecked={star == 1}
                              />

                            </div>

                          </div>
                        </div>
                      }
                      <div className='buyaganplusprice'>
                        <div>
                          <button className='buyagan' onClick={()=> history.push (`/${detail.shop_id}/posts/${detail.post_id}`)}>Buy this Again </button></div>
                        <div className='buyaganprice'>
                          <div>${posts.filter(post => detail.post_id == post.id)[0]?.price}{}<b className='zeb'>({detail?.quantity})</b></div></div>
                      </div>

                    </div>






                  </div>))}
              </div>
            </div>
            <div className='reviewbuttongrids'>
              <div className='process'>
                Processed
              </div>
              {/* <div className='lebuttons'>
                <button className='rebuy'>Repurchase</button>
              </div>
              <div className='lebuttons'>
                <button className='viewrev'>
                  View Review
                </button>
              </div>
              <div className='lebuttons'>
                <button className='editdetailrev'>Edit Review</button>
              </div> */}
            </div>

          </div>
        ))}










        <div> {revi && (
          <Modal onClose={() => setrevi(false)}>
            <ReviewForm shops={shops} posts={posts} currentpost={currentpost} star={star} thisUser={thisUser} setrevi={setrevi}/>
          </Modal>
        )}</div>
         <div> {editrevi && (
          <Modal onClose={() => setedirevi(false)}>
            <ReviewEditForm shops={shops} posts={posts} currentpost={currentpost} star={star} thisUser={thisUser} filteredReviews={filteredReviews} setedirevi={setedirevi}/>
          </Modal>
        )}</div>
      </div>
    </>
  );
}

export default Purchases;