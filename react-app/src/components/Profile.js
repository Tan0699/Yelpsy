import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { logout } from "../store/session";
import "./profbutton.css"
import LogoutButton from "./auth/LogoutButton";
import { Modal } from "../context/Modal";
import ShopForm from "./Shopform";
function ProfileButton({isUser}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
  const [sho, setSho] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let shopModal = (
    <div>
     
      {sho && (
        <Modal onClose={() => setSho(false)}>
          <ShopForm setSho={setSho} />
        </Modal>
      )}
    </div>)
  return (
    <>
    <div className="profcontainer">
      <div id="profile" onClick={openMenu}>
        <div className="icon6">
      <img id="icon5" src="https://i.ibb.co/zJ2LJ1h/icon2.png" alt="icon2" />
      </div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="content">
            <div className="contentinner">
          <div className="isuserwrap">
            <img className="userimageprof" src={isUser.image}></img>
            <div className="isusernamewrap"><div className="isusername">{isUser.firstname}</div></div>
         </div>
            <div className="pandrwrap" onClick={()=> history.push("/purchases")}>
                <div>
                <i id="lepen" class="fa-regular fa-pen-to-square"></i>
                </div>
                <div className="purnrevwrap" >
                <div className="purnrev"> Purchases and Reviews</div></div>
            </div>
           
            <div className="pandrwrap" onClick={()=> setSho(true)}>
                <div>
                <i id="lepen" class="fa-regular fa-building"></i>
                </div>
                <div className="purnrevwrap" >
                <div className="purnrev2"> Open a Shop</div></div>
            </div>
            <div>
           <LogoutButton/>
          </div>
          </div>
      </div>

        </div>
      )}
      </div>
      {shopModal}
    </>
  );
}

export default ProfileButton;