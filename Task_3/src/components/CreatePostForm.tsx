import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import type { Post } from '../redux/postsSlice';
import { useAppDispatch } from '../redux/hook';
import { createPost } from '../redux/postsSlice';

type Props = {
  userIds: number[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type PostForm = Omit<Post, 'id'>;
type Error = {
  [K in keyof PostForm]?: string | null;
};

const CreatePostForm = ({ userIds, isOpen, setIsOpen }: Props) => {
  const [formData, setFormData] = useState<PostForm>();
  const [errors, setErrors] = useState<Error>();
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(
      (prevFormData) => ({ ...prevFormData, [name]: name == 'userId' ? +value : value } as PostForm)
    );
  };

  const validate = (): Error => {
    const errors: Error = {};
    if (formData?.userId == -1) errors.userId = 'User id is required';
    else if (formData?.userId != -1) delete errors.userId;

    if (!formData?.title) errors.title = 'Title is required';
    else if (formData.title) delete errors.title;

    if (!formData?.body) errors.body = 'Body is required';
    else if (formData.body) delete errors.body;
    return errors;
  };

  const handleCreatePost = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    console.log(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(createPost(formData as PostForm));
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setFormData({ userId: -1, title: '', body: '' });
    setErrors({});
  }, [isOpen]);

  return (
    <form className='w-1/3 min-h-1/2 border rounded-md bg-white p-4' onSubmit={handleCreatePost}>
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
        >
          <option value={-1} defaultChecked>
            Select user
          </option>
          {userIds.map((userId) => {
            return <option key={`userId-${userId}`}>{userId as number}</option>;
          })}
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
        />
      </div>
      <button className='float-right border px-4 py-2 rounded-md bg-slate-800 text-slate-100'>
        Submit
      </button>
    </form>
  );
};

export default CreatePostForm;
