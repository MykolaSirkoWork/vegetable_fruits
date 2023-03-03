import React, { useContext } from 'react';
import { AddForm } from '../../components/AddForm';
import { ItemsList } from '../../components/ItemsList';
import { AppContext } from '../../context/AppContext';
import './HomePage.scss';

export const HomePage = () => {
  const {
    role,
    setRole,
    setAccessToken,
  } = useContext(AppContext);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    setRole('');
    setAccessToken(null);
  };

  return (
    <div className="home">
      <button
        type="button"
        onClick={handleLogout}
        className="home__log-out"
      >
        Logout
      </button>
      <div className="home__title">Items List</div>
      <p>{`(Your role is: ${role})`}</p>
      <AddForm />
      <div className="list">
        <ItemsList />
      </div>
    </div>
  );
};
