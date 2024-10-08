import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hook';
import { fetchPosts, Post } from './redux/postsSlice';

function App() {
  const { items: posts, error, status } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

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
    <div>
      <h1 className='text-center text-4xl py-4'>Posts</h1>
      <div className='grid grid-cols-4 gap-4 p-10'>
        {posts.map((post) => {
          return <PostItem key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className='border p-2 rounded-md'>
      <p>
        <span className='font-semibold'>Post Id:</span> {post.id}
      </p>
      <p>
        <span className='font-semibold'>User Id:</span> {post.userId}
      </p>
      <h2>
        <span className='font-semibold'>Title:</span> {post.title}
      </h2>
      <p>
        <span className='font-semibold'>Body:</span> {post.body}
      </p>
    </div>
  );
};

export default App;
