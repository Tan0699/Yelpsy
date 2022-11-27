
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal } from '../context/Modal';
import LogoutButton from './auth/LogoutButton';
import "./Nav.css"
import PostForm from './Postform';
import ShopForm from './Shopform';

const NavBar = () => {
  const [sho, setSho] = useState(false);
  const [pos, setPos] = useState(false);
  let shopModal = (
    <div>
      <button onClick={() => (setSho
        (true))}>ADD A SHOP</button>
    
    {sho && (
       <Modal onClose={() => setSho(false)}>
       <ShopForm setSho={setSho}/>
     </Modal>
    )}
    
    </div>)
    let postModal = (
      <div>
        <button  onClick={() => (setSho
          (true))}>ADD A POST</button>
      
      {pos && (
      <Modal onClose={() => setPos(false)}>
      <PostForm setPos={setPos}/>
    </Modal>
   )}
      
      </div>)
    
  return (
    <nav>
      <ul className='navstuff'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <li>
          <LogoutButton />
        </li>
        {/* <div>{shopModal}</div> */}
        {/* <div>{postModal}</div> */}
      </ul>
    </nav>
  );
}

export default NavBar;
