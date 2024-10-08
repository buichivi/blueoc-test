import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import type { Post } from '../redux/postsSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { createPost } from '../redux/postsSlice';

type Props = {
  userIds: number[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type PostForm = Omit<Post, 'id'>;
type Error = {
  [K in keyof PostForm]?: string | null;
} & { api?: string };

const CreatePostForm = ({ userIds, setIsOpen }: Props) => {
  const [formData, setFormData] = useState<PostForm>({ userId: -1, title: '', body: '' });
  const [errors, setErrors] = useState<Error>({});
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.posts);

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'userId' ? +value : value,
    }));
  };

  const validate = (): Error => {
    const errors: Error = {};
    if (formData?.userId === -1) errors.userId = 'User id is required';
    if (!formData?.title) errors.title = 'Title is required';
    if (!formData?.body) errors.body = 'Body is required';
    return errors;
  };

  const handleCreatePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        await dispatch(createPost(formData as PostForm));
      } catch (error) {
        console.error('Failed to create post: ', error);
        setErrors({ api: 'Failed to create post. Please try again.' });
      }
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      setFormData({ userId: -1, title: '', body: '' });
      setErrors({});
      setIsOpen(false);
    }
  }, [status]);

  return (
    <form
      className='w-2/3 lg:w-1/3 min-h-1/2 border rounded-md bg-white p-4'
      onSubmit={handleCreatePost}
    >
      <h3 className='text-center text-2xl'>Create post</h3>
      <div className='my-1'>
        <label htmlFor='userId' className='mb-1 flex items-center justify-between'>
          <span>User Id: </span>
          {errors?.userId && <span className='text-red-500'>{errors.userId}</span>}
        </label>
        <select
          name='userId'
          id='userId'
          className='w-full outline-none border rounded-md px-2 py-1 resize-none'
          onChange={handleChange}
          value={formData.userId}
        >
          <option value={-1}>Select user</option>
          {userIds.map((userId) => (
            <option key={`userId-${userId}`}>{userId}</option>
          ))}
        </select>
      </div>
      <div className='my-1'>
        <label htmlFor='title' className='mb-1 flex items-center justify-between'>
          <span>Title: </span>
          {errors?.title && <span className='text-red-500'>{errors.title}</span>}
        </label>
        <textarea
          rows={2}
          name='title'
          id='title'
          className='w-full outline-none border rounded-md px-2 py-1 resize-none'
          onChange={handleChange}
          value={formData.title}
        />
      </div>
      <div className='my-1'>
        <label htmlFor='body' className='mb-1 flex items-center justify-between'>
          <span>Body: </span>
          {errors?.body && <span className='text-red-500'>{errors.body}</span>}
        </label>
        <textarea
          rows={5}
          name='body'
          id='body'
          className='w-full outline-none border rounded-md px-2 py-1 resize-none'
          onChange={handleChange}
          value={formData.body}
        />
      </div>
      {status === 'creating faild' && <span className='text-red-500'>{error}</span>}
      <div>
        <button
          className='float-right border px-4 py-2 rounded-md bg-slate-800 text-slate-100 disabled:opacity-50 disabled:cursor-default'
          disabled={status === 'creating'}
        >
          {status === 'creating' ? 'Creating...' : 'Submit'}
        </button>
        <button
          type='button'
          className='float-right mr-4 border px-4 py-2 rounded-md bg-red-600 text-slate-100'
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;
