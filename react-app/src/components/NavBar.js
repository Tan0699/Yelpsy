
import React, { useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import LogoutButton from './auth/LogoutButton';
import EditPostForm from './EditPostform';
import EditShopForm from './EditShopform';
import "./Nav.css"
import PostForm from './Postform';
import ShopForm from './Shopform';
import LoginForm from '../components/auth/LoginForm'
import { useSelector } from 'react-redux';
import ProfileButton from './Profile';
import SearchBar from './SearchedPage/SearchBar';
// import fda from "../../public/fa"
const NavBar = () => {
  const history = useHistory()
  const { shopId, id } = useParams()
  const [sho, setSho] = useState(false);
  const [pos, setPos] = useState(false);
  const [editsho, setEditSho] = useState(false);
  const [editpos, setEditPos] = useState(false);
  const [log, setLog] = useState(false);
  const isUser = useSelector((state) => state.session.user)
  let shopModal = (
    <div>
      <button className='shopppo' onClick={() => (setSho
        (true))}>Start Your Shop</button>
      {sho && (
        <Modal onClose={() => setSho(false)}>
          <ShopForm setSho={setSho} />
        </Modal>
      )}
    </div>)

  // let postModal = (
  //   <div>
  //     <button onClick={() => (setPos
  //       (true))}>ADD A POST</button>
  //     {pos && (
  //       <Modal onClose={() => setPos(false)}>
  //         <PostForm setPos={setPos} />
  //       </Modal>
  //     )}
  //   </div>)

  let editshopModal = (
    <div>
      <button onClick={(e) => ((setEditSho(true)))}>EDIT A SHOP</button>
      {editsho && (
        <Modal onClose={() => setEditSho(false)}>
          <EditShopForm setEditSho={setEditSho} />
        </Modal>
      )}
    </div>)



  let logModal = (
    <div>
      <button className='setsignbut' onClick={() => ((setLog(true)))}>Sign in</button>
      {log && (
        <Modal onClose={() => setLog(false)}>
          <LoginForm setLog={setLog} />
        </Modal>
      )}
    </div>)

  return (
    <div>
      <nav className='lenav'>
        <div className='navstuff'>
          <div className='searchhomewrap'>
          <div className='welcome'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img className='logoo' src="https://i.ibb.co/jvjwccF/favi-2.png" alt="melogoforreal" border="0" />
            </NavLink>
            <div className='ismewrap'>
            </div>
          </div>
          <SearchBar />
          </div>
          {/* <form className="bigsearchform" >
          <input className='bigsearchbar' type="text" placeholder="THIS IS A WORK IN PROGRESS" name="search" />
          <button className='bigsearchbutton' type="submit"><i class="fa fa-search"></i></button>
        </form> */}

          <div className='zestuffwrap'>
            <div className='zecartwrap'>
              <i id="zecart" class="fa-solid fa-cart-shopping" onClick={() => history.push("/cart")}></i>
            </div>

            {!isUser &&
              <div className='logmodalwrap'>
                {logModal}
              </div>}
            {/* <div>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          </div> */}

            {/* <div>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          </div> */}
            {/* <div>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
          </div> */}

            {/* {(isUser && !shopId && !id) &&
          <div>{shopModal}</div>} */}


            {/* <div className='zecartwrap'> */}
            {/* <img className='githuu' onClick={(e) => (window.open('https://github.com/Tan0699', '_blank'))} src="https://cdn-icons-png.flaticon.com/512/25/25231.png">
            </img> */}
            {/* </div> */}

            {/* <div className='zecartwrap'> */}
            {/* <img className='githuu' src="https://cdn-icons-png.flaticon.com/512/174/174857.png" onClick={(e) => (window.open('https://www.linkedin.com/in/tan-nguyen-8b0a8a257/', '_blank'))}></img> */}
            {/* </div> */}
            {isUser &&

              <div className='marketprofwrap'>
                {/* <div className='marketwrap'>
<i id="market" onClick={()=> history.push("/manage")} class="fa-solid fa-store"></i>
</div> */}
                <div className='profwrapper'> <ProfileButton isUser={isUser} /></div>
              </div>}
          </div>
          {/* {isUser &&
          <div>{postModal}</div>}  */}
          {/* {(shopId && !id && isUser) && 
         <div>{editshopModal}</div>
         (id && isUser)&& */}
          {/* <div>{editpostModal}</div>  */}
        </div>
      </nav>
      <div className='navline'></div>
    </div>
  );
}

export default NavBar;
