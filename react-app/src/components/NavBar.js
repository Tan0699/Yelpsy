
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import LogoutButton from './auth/LogoutButton';
import EditPostForm from './EditPostform';
import EditShopForm from './EditShopform';
import "./Nav.css"
import PostForm from './Postform';
import ShopForm from './Shopform';
import LoginForm from '../components/auth/LoginForm'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const { shopId, id } = useParams()
  const [sho, setSho] = useState(false);
  const [pos, setPos] = useState(false);
  const [editsho, setEditSho] = useState(false);
  const [editpos, setEditPos] = useState(false);
  const [log, setLog] = useState(false);
  const isUser = useSelector((state)=> state.session.user )
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
      <button  onClick={(e) => ((setEditSho(true)))}>EDIT A SHOP</button>
      {editsho && (
        <Modal onClose={() => setEditSho(false)}>
          <EditShopForm setEditSho={setEditSho} />
        </Modal>
      )}
    </div>)

  

  let logModal = (
    <div>
      <button className='setsignbut' onClick={() => ((setLog(true)))}>Login</button>
      {log && (
        <Modal onClose={() => setLog(false)}>
          <LoginForm setLog={setLog} />
        </Modal>
      )}
    </div>)

  return (
    <nav>
      <div className='navstuff'>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
         <img className='logoo' src="https://i.ibb.co/09jtMgV/melogo3.png" alt="melogoforreal" border="0"/>
          </NavLink>
        </div>
        {!isUser &&
        <div>
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
           {(isUser && !shopId && !id )&&
        <div>{shopModal}</div>}
          {isUser &&
        <div>
          <LogoutButton />
        </div>}
       
         {/* {isUser &&
          <div>{postModal}</div>}  */}
         {/* {(shopId && !id && isUser) && 
         <div>{editshopModal}</div>
         (id && isUser)&& */}
             {/* <div>{editpostModal}</div>  */}
      </div>
    </nav>
  );
}

export default NavBar;
