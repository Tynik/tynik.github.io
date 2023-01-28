import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import detectEthereumProvider from '@metamask/detect-provider';
import { Editor, EditorState } from 'draft-js';

import type { Post } from '~/types';

import { PostCard } from '~/components';
import { addPost, getPosts } from '~/api';

const requestEthAccounts = async (): Promise<string[]> => {
  try {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (e) {
    if (e.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
    }
    throw e;
  }
};

export const Main = () => {
  const [ethAccount, setEthAccount] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

  useEffect(() => {
    detectEthereumProvider({ mustBeMetaMask: true })
      .then(provider => {
        if (!provider) {
          throw new Error('Please install MetaMask!');
        }

        return requestEthAccounts().then(accounts => {
          if (!accounts.length) {
            console.log('Please connect to MetaMask.');
          }
          setEthAccount(accounts[0]);
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => {
        //
      });
  }, []);

  const addPostHandler = () => {
    addPost({
      title: 'test',
      content: editorState.getCurrentContent().getPlainText(),
      ethAccount,
    }).catch(() => {});
  };

  return (
    <>
      <Typography variant="h4">Posts</Typography>

      <Button onClick={addPostHandler}>Add Post</Button>

      <div style={{ border: '1px solid white', minHeight: '6em', cursor: 'text' }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write something!"
        />
      </div>

      <Stack mt={2} direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
        {posts?.map(({ title, content }, index) => (
          <PostCard key={index} title={title} content={content} />
        ))}
      </Stack>
    </>
  );
};
