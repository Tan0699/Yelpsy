import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { login } from '../../store/session';
import SignUpForm from './SignUpForm';

const LoginForm = ({setLog}) => {
  const [sign, setSign] = useState(false);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    else{setLog(false)}
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    setLog(false)
    return <Redirect to='/' />;
  }
  let signModal = (
    <div>
      <button onClick={() => ((setSign
        (true)))}>REGISTER</button>
      {sign && (
        <Modal onClose={() => (setSign(false),setLog(false))}>
          <SignUpForm setSign={setSign} />
        </Modal>
      )}
    </div>)
  return (
    <>
    <div>
      {signModal}
    </div>
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          required
        />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          required
        />
        <button type='submit'>Login</button>
      </div>
    </form>
    </>
  );
};

export default LoginForm;
