import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { fetchPosts } from './redux/postsSlice';
import PostItem from './components/PostItem';
import CreatePostForm from './components/CreatePostForm';

function App() {
  const { items: posts, error, status } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [isAddingPost, setIsAddingPost] = useState(false);

  const userIds = useMemo(() => Array.from(new Set(posts.map((post) => post.userId))), [posts]);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchPosts());
  }, [status, dispatch]);

  return (
    <div className='p-10'>
      <h1 className='text-center text-4xl py-4'>Posts</h1>
      <div className='py-2 flex items-center justify-between'>
        <div></div>
        <div>
          <button
            className='border px-4 py-2 rounded-md bg-slate-800 text-slate-100'
            onClick={() => setIsAddingPost(!isAddingPost)}
          >
            Add post
          </button>
          <input
            type='checkbox'
            checked={isAddingPost}
            onChange={(e) => setIsAddingPost(e.target.checked)}
            className='hidden [&:checked+div]:opacity-100 [&:checked+div]:pointer-events-auto'
          />
          <div
            className={`fixed top-0 left-0 size-full opacity-0 flex items-center justify-center pointer-events-none transition-all`}
          >
            <div
              className='absolute top-0 left-0 size-full -z-[1] bg-[#0000009a]'
              onClick={() => setIsAddingPost(false)}
            ></div>
            <CreatePostForm userIds={userIds} setIsOpen={setIsAddingPost} />
          </div>
        </div>
      </div>
      {status === 'loading' && <h3>Loading posts...</h3>}
      {status === 'failed' && <h3>Error: {error}</h3>}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
        {posts.map((post) => (
          <PostItem key={`postId-${post.id}`} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
