import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import DeliveryContext from '../context/DeliveryContext';
import postFetch from '../utils/postFetch';

function AdminPage() {
  const { userInfos } = useContext(DeliveryContext);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [btnAvailability, toggleBtnAvailability] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (event) => {
    const option = event.target.name;
    const inputs = {
      email: () => setEmail(event.target.value),
      password: () => setPassword(event.target.value),
      name: () => setname(event.target.value),
      role: () => setRole(event.target.value),
    };
    inputs[option]();
  };

  const handleClick = async () => {
    const user = { name, email, password, role };
    const newUser = await postFetch(
      user,
      'users/register/admin',
      userInfos.token,
    );
    if (newUser.message) {
      setErrorMessage(newUser.message);
    }
  };

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
    const nameValidation = () => {
      const MIN_NAME_LENGTH = 12;
      const isNameValid = name.length >= MIN_NAME_LENGTH;
      return isNameValid;
    };
    const registerButtonControl = () => {
      const isEmailValid = emailValidator();
      const isPasswordValid = passwordValidation();
      const isNameValid = nameValidation();
      const isRoleDefined = role !== '';
      if (isEmailValid && isPasswordValid && isNameValid && isRoleDefined) {
        return toggleBtnAvailability(false);
      }
      return toggleBtnAvailability(true);
    };
    registerButtonControl();
  });

  return (
    <>
      <Navbar />
      <div
        data-testid="admin_manage__element-invalid-register"
        hidden={ !errorMessage }
        className="alert alert-danger"
        role="alert"
      >
        { errorMessage }
      </div>

      <div>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Nome e sobrenome"
              aria-label="full name"
              data-testid="admin_manage__input-name"
              name="name"
              onChange={ handleChange }
            />
          </div>
          <div className="col">
            <input
              type="email"
              className="form-control"
              placeholder="seu-email@site.com.br"
              aria-label="email"
              data-testid="admin_manage__input-email"
              name="email"
              onChange={ handleChange }
            />
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              aria-label="password"
              data-testid="admin_manage__input-password"
              name="password"
              onChange={ handleChange }
            />
          </div>
          <select
            className="col"
            id="floatingSelectGrid"
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ handleChange }
          >
            <option defaultValue="''">Perfil</option>
            <option value="customer">Cliente</option>
            <option value="administrator">Administrador</option>
            <option value="seller">Vendedor</option>
          </select>
          <div className="col">
            <button
              data-testid="admin_manage__button-register"
              type="button"
              className="btn btn-success"
              onClick={ handleClick }
              disabled={ btnAvailability }
            >
              Cadastrar

            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
