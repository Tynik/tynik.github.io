import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddPostPage, EditPostPage, MainPage, ResumePage, ViewPostPage } from '~/pages';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="post" element={<AddPostPage />} />
      <Route path="post/:postCID" element={<ViewPostPage />} />
      <Route path="post/:postCID/edit" element={<EditPostPage />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
