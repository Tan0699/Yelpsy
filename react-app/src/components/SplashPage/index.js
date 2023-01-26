import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { fetchPosts, fetchRandomPosts } from '../../store/posts';
import { clearAction, deleteShop, fetchShops } from '../../store/shops';
import Footer from '../Footer';
import ShopForm from '../Shopform';
import './Splash.css'

function Splash() {
  const dispatch = useDispatch()
  useEffect(() => {
    Promise.all(
      [dispatch(clearAction()),
      dispatch(fetchShops()),
      dispatch(fetchRandomPosts())]
    ).then(() => {
      setisLoaded(true)
    })
  }, [dispatch])
  const isUser = useSelector((state) => state.session.user)
  const shopState = useSelector((state) => state.shops)
  const shops = Object.values(shopState)
  const postState = useSelector((state) => state.posts)
  const posts = Object.values(postState)
  const history = useHistory()
  const [isloaded, setisLoaded] = useState(false)


  // const array = []
  // console.log("aaray",array)
  // for ( let i = 0 ;i<=100 ; i++){
  //  let random = Math.floor(Math.random()*posts.length)
  //  if (!(array.includes(posts[random]))){
  //   console.log("random",random)
  //   array.push(posts[random])
  //  }
  //  if(array.length ==8){
  //  break
  //  }
  // }



  // posts.sort((a,b) => 0.5 - Math.random());
  // shops.sort((a,b) => 0.5 - Math.random())




  return (isloaded &&
    <>
      {/* <div>
      //
      <button onClick={()=> history.push("/purchases")}>PURRRCHASES</button>
      <button onClick={()=> history.push("/cart")}>CART PAGE</button>
    </div> */}
      {/* <div className='wpdiv'>
        <img className='newwp' src="https://i.ibb.co/S5DZC80/lepic.png"></img></div> */}
      <div className='color'>
        <div className='pink'>
          {!isUser &&
            <div className='blanktextwrap'>
              <div className='blanktext'>Enjoy the Holidays With Some Delicous Food!</div></div>
          }
          {isUser &&
            <div className='blanktextwrap'>
              <div className='blanktext'>Welcome back, {isUser.firstname}!</div></div>}
        </div>
        <div className='cheke'>
          <div className='checkoutshop'></div>
        </div>
      </div>

      <div className='shopgrid'>
        {shops?.filter((array, index) => index < 5).map((shop) => (
          <div className='inmap' key={shop.id}>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="navls" to={`/${shop.id}`}>
              <div className='imagename'>
                <div className='Imagewrapwrap'>
                <div className='ImageWrap'>
                  <img className='Image' src={shop?.image}></img></div></div>
                <div className='justnamewrap'>
                  <div className='justname'>{shop?.name}</div>
                </div>
              </div>
            </NavLink>

          </div>
        ))}</div>













      {/* <div>POST SHOPS</div> */}

      <div className='postgrid'>
        {posts?.filter((array, index) => index < 8).map(post => (
          <NavLink className="priceroo" onClick={() => window.scrollTo(0, 0)} to={`/${post.shop_id}/posts/${post.id}`}>
            <div className={`PostImageContainer${posts.indexOf(post)}`} key={post.id}>
              <div className='PostImage'>
                <img className={`pics`} src={post?.image}
                ></img>
              </div>
              <div className={`PostPriceWrap${posts.indexOf(post)}`}>
                <div className='Price'>${post.price}</div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
      {/* <div className='shopgrid2'>
        {posts?.filter((array, index) => (index > 7 && index<12)).map((shop) => (
          <div className='inmap' key={shop.id}>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="navls" to={`/${shop.shop_id}/posts/${shop.id}`}>
              <div className='imagename'>
                <div className='ImageWrap'>
                <img className='Image' src={shop?.image}></img></div>
                <div className='justnamewrap'>
                <div className='justname'>{(shop?.name).split("-")[0]}</div></div>
              </div>
            </NavLink>

          </div>
        ))}</div> */}
      <div className='shopgrid2'>
        {shops?.filter((array, index) => (index > 3 && index < 9)).map((shop) => (
          <div className='inmap2' key={shop.id}>
            <NavLink onClick={() => window.scrollTo(0, 0)} className="navls" to={`/${shop.id}`}>
              <div className='imagename'>
                <div className='Imagewrapwrap'>
                <div className='ImageWrap'>
                  <img className='Image' src={shop?.image}></img></div></div>
                <div className='justnamewrap'>
                  <div className='justname'>{shop?.name}</div>
                </div>
              </div>
            </NavLink>

          </div>
        ))}</div>


<div className='browse'>Browse Collections for more inspiration </div>
<div className='uniq'>Shop these unique finds </div>
      <div className='lastgrid'>
        {shops?.filter((shop) => (shop?.posts?.length > 3)).filter((array, index) => (index < 4)).map((shop) => (
          <div className='lastgridinner'>

            <div className='minigridnamewrapwrap'>
              <div className='minigridnamewrap'>
                <div className='minigridname'><NavLink className={"splashnav"} to={`/${shop.id}`}>{shop?.name}</NavLink></div>
                {/* <div>...</div> */}
              </div>
              <div className='miniitemwrap'>
                <div>{shop?.posts?.length} items</div></div>
            </div>
            <div className='lastsplashgrid'>
            {shop?.posts?.filter((array, index) => (index < 4)).map((post) => (
              <NavLink className={"isu"} to={`/${post.shop_id}/posts/${post.id}`}>
            <div className='lastimagewrap'>
              <img className={`lastimage${shop?.posts?.indexOf(post)}`} src={post?.image}></img>
            </div>
              </NavLink>
            ))}
</div>

          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default Splash;