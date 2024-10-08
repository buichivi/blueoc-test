import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { fetchPosts } from './redux/postsSlice';
import PostItem from './components/PostItem';
import CreatePostForm from './components/CreatePostForm';

function App() {
  const { items: posts, error, status } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();
  const [isAddingPost, setIsAddingPost] = useState(false);

  const userIds = useMemo(() => {
    return Array.from(
      posts.reduce((acc, post) => {
        const userId = post.userId;
        acc.add(userId);
        return acc;
      }, new Set())
    ) as number[];
  }, [posts]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status == 'loading') {
    return <h1>Loading...</h1>;
  }
  if (status == 'failed') {
    return <h1>Error: {error}</h1>;
  }

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
            <CreatePostForm userIds={userIds} isOpen={isAddingPost} setIsOpen={setIsAddingPost} />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 '>
        {posts.map((post) => {
          return <PostItem key={`postId-${post.id}`} post={post} />;
        })}
      </div>
    </div>
  );
}

export default App;
