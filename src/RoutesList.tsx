import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  NewPostPage,
  EditPostPage,
  MainPage,
  ResumePage,
  ViewPostPage,
  DraftPostsPage,
} from '~/pages';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="post" element={<NewPostPage />} />
      <Route path="post/:postCID" element={<ViewPostPage />} />
      <Route path="post/:postCID/edit" element={<EditPostPage />} />
      <Route path="drafts" element={<DraftPostsPage />} />
      <Route path="resume" element={<ResumePage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
