import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import postFetch from '../utils/postFetch';
import role from '../utils/roleValidator';
import '../style/Login.style.css';
import logo from '../images/g13delivery.gif';

function LoginPage() {
  const {
    userInfos,
    setUserInfos,
    isButtonDisabled,
    setIsButtonDisabled,
    setBtnActive,
  } = useContext(DeliveryContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginError, setShowLoginError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const userValidator = () => {
      if (userInfos) return history.push(role.roleValidator(userInfos));
    };
    userValidator();
  }, [userInfos, history]);

  const handleChange = (event) => {
    const option = event.target.name;
    const inputs = {
      email: () => setEmail(event.target.value),
      password: () => setPassword(event.target.value),
    };
    inputs[option]();
  };

  const handleClick = (event) => {
    event.preventDefault();
    const option = event.target.name;
    const buttons = {
      register: () => history.push('/register'),
      login: async () => {
        setBtnActive('Products');
        const response = await postFetch({ email, password }, 'login');
        if (response.message) return setShowLoginError(true);
        localStorage.setItem('user', JSON.stringify(response));
        setUserInfos(response);
      },
    };
    buttons[option]();
  };

  // login button control
  useEffect(() => {
    const emailValidator = () => {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const isEmailValid = email.match(emailRegex);
      return isEmailValid;
    };
    const passwordValidation = () => {
      const MIN_PASSWORD_LENGTH = 6;
      const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
      return isPasswordValid;
    };
    const loginButtonControl = () => {
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidation();
      if (isEmailValid && isPasswordValid) return setIsButtonDisabled(false);
      return setIsButtonDisabled(true);
    };
    loginButtonControl();
  });

  return (
    <div className="login_page">
      {/* logar usando o Enter */}
      <div className="logo_image">
        <img src={ logo } alt="G13 logo gif" width="400px" height="350px" />
      </div>
      <form onSubmit={ handleClick }>
        <p>Login</p>
        <input
          type="text"
          placeholder="email@delivery.com.br"
          data-testid="common_login__input-email"
          name="email"
          onChange={ handleChange }
        />
        <p>Senha</p>
        <input
          type="password"
          placeholder="**************"
          data-testid="common_login__input-password"
          name="password"
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="common_login__button-login"
          disabled={ isButtonDisabled }
          name="login"
          onClick={ handleClick }
          className="login_button"
        >
          LOGIN
        </button>
        <button
          type="submit"
          data-testid="common_login__button-register"
          name="register"
          onClick={ handleClick }
          className="register_button"
        >
          Ainda não tenho conta
        </button>
      </form>
      <div data-testid="common_login__element-invalid-email">
        {showLoginError && <p className="invalid_login"> Senha ou email invalidos </p>}
      </div>
    </div>
  );
}

export default LoginPage;
