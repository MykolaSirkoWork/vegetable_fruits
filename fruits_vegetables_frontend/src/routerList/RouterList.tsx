import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { ItemPage } from '../pages/ItemPage';

export const RouterList = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />
      <Route path="item/:id" element={<ItemPage />} />
    </Routes>
  );
};
