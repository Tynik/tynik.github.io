import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { Main, Resume } from '~/pages';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="resume" element={<Resume />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
};
