import React, { useState, useEffect, useContext } from 'react';
import AdminTable from '../components/AdminTable';
import Navbar from '../components/Navbar';
import DeliveryContext from '../context/DeliveryContext';
import postFetch from '../utils/postFetch';
import getFetch from '../utils/getFetch';
import deleteFetch from '../utils/deleteFetch';
import '../style/Admin.style.css';

function AdminPage() {
  const { userInfos } = useContext(DeliveryContext);
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [btnAvailability, toggleBtnAvailability] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [usersFromDb, setUsersFromDb] = useState(null);

  const formatUsers = (usersData) => {
    const filterAdmin = usersData.filter((user) => user.role !== 'administrator');
    const formatingUser = filterAdmin.map((data) => ({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role === 'seller' ? 'P. Vendedora' : 'Cliente',
    }));
    return formatingUser;
  };

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      const users = await getFetch('users');
      const usersFormated = formatUsers(users);
      if (isMounted) setUsersFromDb(usersFormated);
    };
    getUsers();
    return () => { isMounted = false; };
  }, []);

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
    if (userInfos) {
      const newUser = await postFetch(
        user,
        'users/register/admin',
        userInfos.token,
      );
      if (newUser.message) {
        return setErrorMessage(newUser.message);
      }
      const users = [...usersFromDb, newUser];
      const formated = formatUsers(users);
      return setUsersFromDb(formated);
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

  const handleRemoveBtn = async (userName, userId) => {
    const filterUsers = usersFromDb.filter((user) => user.name !== userName);
    setUsersFromDb(filterUsers);
    await deleteFetch(userId, 'users', userInfos.token);
  };

  return (
    <>
      <Navbar />
      {errorMessage && (
        <div
          data-testid="admin_manage__element-invalid-register"
          className="alert alert-danger"
          role="alert"
        >
          { errorMessage }
        </div>
      )}
      <h4>Cadastrar novo usuário</h4>
      <section className="admin-form">
        <label htmlFor="name">
          <input
            type="text"
            className="form-control"
            placeholder="Nome e sobrenome"
            aria-label="full name"
            data-testid="admin_manage__input-name"
            name="name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email">
          <input
            type="email"
            className="form-control"
            placeholder="seu-email@site.com.br"
            aria-label="email"
            data-testid="admin_manage__input-email"
            name="email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            className="form-control"
            placeholder="Senha"
            aria-label="password"
            data-testid="admin_manage__input-password"
            name="password"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role">
          <select
            className="role-select"
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
        </label>
        <div className="submit-button">
          <button
            data-testid="admin_manage__button-register"
            type="submit"
            className="btn btn-success"
            onClick={ handleClick }
            disabled={ btnAvailability }
          >
            Cadastrar
          </button>
        </div>
      </section>
      <h4>Lista de Usuários</h4>
      <section className="admin-table">
        {usersFromDb
          && <AdminTable users={ usersFromDb } handleRemoveBtn={ handleRemoveBtn } />}
      </section>
    </>
  );
}

export default AdminPage;
