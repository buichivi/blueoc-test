import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type PostState = {
  items: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: PostState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return res.data;
});

export const createPost = createAsyncThunk<Post, Omit<Post, 'id'>>(
  'posts/createPost',
  async (newPost) => {
    const res = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return res.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //handle fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch posts';
      })
      //handle createPost
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'succeeded';

        // fix create post always return new post with id = 101
        const maxId = Math.max(...state.items.map((item) => item.id));
        if (action.payload.id <= maxId)
          state.items = [{ ...action.payload, id: maxId + 1 }, ...state.items];
        else state.items = [action.payload, ...state.items];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create post';
      });
  },
});

export default postsSlice.reducer;
