import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddPostPage, MainPage, ResumePage, ViewPostPage } from '~/pages';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="add-post" element={<AddPostPage />} />
      <Route path="post/:postCID" element={<ViewPostPage />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
