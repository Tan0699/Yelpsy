
import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Modal } from '../context/Modal';
import LogoutButton from './auth/LogoutButton';
import EditPostForm from './EditPostform';
import EditShopForm from './EditShopform';
import "./Nav.css"
import PostForm from './Postform';
import ShopForm from './Shopform';

const NavBar = () => {
  const {shopId,id} =useParams()
  const [sho, setSho] = useState(false);
  const [pos, setPos] = useState(false);
  const [editsho, setEditSho] = useState(false);
  const [editpos, setEditPos] = useState(false);
  console.log("shohoshos",shopId)
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
        <button  onClick={() => (setPos
          (true))}>ADD A POST</button>
      
      {pos && (
      <Modal onClose={() => setPos(false)}>
      <PostForm setPos={setPos}/>
    </Modal>
   )}
      
      </div>)
      let editshopModal = (
        <div>
          <button  onClick={(e) => ((setEditSho(true)))}>EDIT A SHOP</button>
        
        {editsho && (
        <Modal onClose={() => setEditSho(false)}>
        <EditShopForm setEditSho={setEditSho}/>
      </Modal>
     )}
        
        </div>)
        let editpostModal = (
          <div>
            <button  onClick={(e) => ((setEditPos(true)))}>EDIT A POST</button>
          
          {editpos && (
          <Modal onClose={() => setEditPos(false)}>
          <EditPostForm setEditPos={setEditPos}/>
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
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <div>{shopModal}</div> 
         <div>{postModal}</div>
         {(shopId && !id) &&
         <div>{editshopModal}</div>}
         {id &&
         <div>{editpostModal}</div>}
      </ul>
    </nav>
  );
}

export default NavBar;
