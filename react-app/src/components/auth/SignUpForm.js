import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './sign.css'
const SignUpForm = ({setSign,setLog}) => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()
  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {

      const data = await dispatch(signUp(firstname, email, password));
      console.log(data)
      if (data) {
        console.log(data)
        setErrors(data)
      }
      else{
        setSign(false)
        setLog(false)
        history.push('/')
      }
    }
    
    else{setErrors(["Passwords must match"])}
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form className='signform' onSubmit={onSignUp}>
      <div className='createacc'>Create your Account</div>
      <div className='regisez'>Registration is easy.</div>
      <div>
        {errors?.map((error, ind) => (
          <div className="errors" key={ind}>{error}</div>
        ))}
      </div>
      <div className='div1'>
        <label className='firstnamewrap'>First Name</label>
        <input className='firstnamelabel'
          type='text'
          name='firstname'
          onChange={updateFirstname}
          value={firstname}
          maxLength={20}
          required
        ></input>
      </div>
      <div className='div2'>
        <label className='emaillwrap'>Email Address</label>
        <input className='emailllabel'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          minLength={4}
          maxLength={20}
          required
        ></input>
      </div>
      <div className='div3'>
        <label className='passwrapp'>Password</label>
        <input className='passlabell'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          minLength={4}
          maxLength={20}
          required
        ></input>
      </div>
      <div className='div4'>
        <label className='repeatwrap'>Repeat Password</label>
        <input className='repeatlabel'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          minLength={4}
          maxLength={20}
          required={true}
        ></input>
      </div>
      <div className='regiwrap'>
      <button className='regisbut' type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
