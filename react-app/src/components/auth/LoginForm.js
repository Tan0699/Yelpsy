import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';
import "./login.css"
const LoginForm = ({ setLog }) => {
  const [sign, setSign] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      console.log("dataDATA",data)
    }
    else { 
      console.log("dataDATA22",data)
      setLog(false)
      history.push('/')
     }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    setLog(false)
    setSign(false)
    return <Redirect to='/' />;
  }
  // let signModal = (
  //   <div>
  //     {sign && (
  //       <Modal onClose={() => (setSign(false))}>
  //         <SignUpForm setSign={setSign} />
  //       </Modal>
  //     )}
  //   </div>)
   
  return (
    <div>
      {sign?<SignUpForm setLog={setLog} setSign={setSign}/>:
    <div className='logcontainer'>
      <div className='logreg'>
        <div className='sig'>Sign In</div>
        <div className='signbutwrap'>
          <button className='setsignbut' onClick={()=> setSign(true)}>Register</button>
          {/* {signModal} */}
        </div>
      </div>
      <form onSubmit={onLogin}>
        <div>
          {errors?.map((error, ind) => (
            <div className="errors" key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <div className='emailwrap'>Email address</div>
          <label htmlFor='email'></label>
          <input className='emaillabel'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div className='passwrapwrap'>
          <div className='passwrap'>Password</div>
          <label  htmlFor='password'></label>
          <input className='passlabel'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            required
          />
          
        </div>
        <button className='signbut' type='submit'>Login</button>
        <div className='demoWrap'>
        <button className='signbut' type='submit'  onClick={()=>{setEmail("Demo@aa.io");setPassword("password")}}>Demo User</button>
        </div>
      </form>
    </div>}
    </div>
  );
};

export default LoginForm;
