import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { fetchPosts } from '../../store/posts';
import { deleteShop, fetchShops } from '../../store/shops';
import EditShopForm from '../EditShopform';
import ReviewForm from '../ReviewForm';
import ShopForm from '../Shopform';
// import './Splash.css'

function Purchases() {
  const shopState = useSelector((state) => state.shops)
  const shops = Object.values(shopState)
  const postState = useSelector((state) => state.posts)
  const posts = Object.values(postState)
  const dispatch = useDispatch()
  const history = useHistory()
  const [revi, setrevi] = useState(false);
  useEffect(() => {
    dispatch(fetchShops())
    dispatch(fetchPosts())
  }, [dispatch])

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

      <div className='postgrid'>
        {posts.filter((apost,yoyo) => yoyo <32).map(post => (
            <div>
           <button onClick={(e) => ((setrevi(true)))}>
            <div className='PostImageContainer' key={post.id}>
              <div className='PostImage'>
                <img className='pics' src={post.image}
                ></img>
              </div>
              <div className='PostPriceWrap'>
                <div className='Price'>${post.price}</div>
              </div>
              
            </div></button>
              </div>
        ))}
   
      </div>
      <div> {revi && (
                <Modal onClose={() => setrevi(false)}>
                  <ReviewForm setrevi={setrevi} />
                </Modal>
              )}</div>
    </>
  );
}

export default Purchases;