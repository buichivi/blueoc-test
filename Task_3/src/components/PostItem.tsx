import { Post } from '../redux/postsSlice';

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

export default PostItem;
