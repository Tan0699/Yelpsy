import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <div className='loggowrap' onClick={onLogout}>
      <div>
      <i id="bracket" class="fa-solid fa-arrow-right-from-bracket"></i>
      </div>
      <div className='loggowrap2'>
  <div className='partypooper'>Logout</div></div>
  </div>
  );
};

export default LogoutButton;
