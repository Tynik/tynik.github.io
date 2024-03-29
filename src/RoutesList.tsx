import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  NewPostPage,
  EditPostPage,
  MainPage,
  ResumePage,
  ViewPostPage,
  DraftPostsPage,
  RestorePostPage,
} from '~/pages';

export const RoutesList = () => {
  return (
    <Routes>
      <Route path="/post" element={<NewPostPage />} />
      <Route path="/post/:slug" element={<ViewPostPage />} />
      <Route path="/post/:slug/edit" element={<EditPostPage />} />
      <Route path="/restore-post" element={<RestorePostPage />} />
      <Route path="/drafts" element={<DraftPostsPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  );
};
