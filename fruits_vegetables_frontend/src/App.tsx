import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { GET_ALL_FRUITS } from './api/fruits';
import { GET_ALL_VEGETABLES } from './api/vegetables';
import './App.scss';
import { AppContext } from './context/AppContext';
import { HomePage } from './pages/Home';
import { ItemPage } from './pages/ItemPage';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  const {
    accessToken,
    role,
    setFruits,
    setVegetables,
  } = useContext(AppContext);

  // eslint-disable-next-line max-len
  const [getFruitsFromServer, { data: fruitsFromServer, loading: load }] = useLazyQuery(GET_ALL_FRUITS);
  const [getVegetablesFromServer, { data: vegetablesFromServer, loading }]
  = useLazyQuery(GET_ALL_VEGETABLES);

  useEffect(() => {
    getFruitsFromServer();
    if (fruitsFromServer && fruitsFromServer.fruits) {
      setFruits(fruitsFromServer.fruits.map(
        ({ id, name, price }: {id: string, name: string, price: number }) => ({ id, name, price }),
      ));
    }
  }, [fruitsFromServer, load]);

  useEffect(() => {
    getVegetablesFromServer();
    if (vegetablesFromServer && vegetablesFromServer.vegetables) {
      setVegetables(vegetablesFromServer.vegetables.map(
        ({ id, name, price }: {id: string, name: string, price: number }) => ({ id, name, price }),
      ));
    }
  }, [vegetablesFromServer, loading]);

  return (
    <div className="app">
      <Routes>
        {accessToken && role ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="item/:id" element={<ItemPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </div>
  );
};
