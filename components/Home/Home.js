import React, { useRef, useState, useEffect, useCallback } from 'react';
import Header from './Header';
import styles from '../compStyles/Home.module.scss';
import Image from 'next/image';

import defaultImg from '../../assets/default.png';
import image from '../../assets/image.svg';
import video from '../../assets/video.svg';
import mic from '../../assets/mic.svg';
import thumbs_up from '../../assets/thumbs-up.svg';
import likefilled from '../../assets/likefilled.svg';
import comment from '../../assets/comment.svg';
import share from '../../assets/Share.svg';
import avatar from '../../assets/avatar.png';
import post_avatar from '../../assets/post_avatar.png';
import post_img_1 from '../../assets/post_img_1.png';
import post_img_2 from '../../assets/post_img_2.png';
import Modal from '../Modal/Index';
import BottomNav from '../BottomNav';

//Redux & State
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../../post/postSlice';
import { useAddNewPostMutation } from '../../post/postApiSlice';
import axios from 'axios';

// Toastify
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  selectCurrentToken,
  selectCurrentUser,
  setCredentials,
} from '../../auth/authSlice';
import { useGetPostQuery } from '../../post/postApiSlice';
import { useGetPostsQuery } from '../../post/pApiSlice';
import Post from './Post';
import Loader from '../misc/Loader';
import { Router } from 'react-router-dom';
import { useRouter } from 'next/router';
import { Loading } from '@nextui-org/react';
import { toast, Toaster } from 'react-hot-toast';

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUpload, setImageUpload] = useState('');
  const [img, setImg] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const canSave = [user?.id, desc].every(Boolean) && !isLoading;

  // console.log(imageUpload);

  // console.log(isLoading);

  // Make Post Function
  const handleNewPost = async (e) => {
    e.preventDefault();
    // console.log('post');
    // console.log(img);
    // const headers = {
    //   authorization: `Bearer ${token}`,
    //   Accept: 'application/json',
    //   'Content-Type': 'multipart/form-data',
    // };

    const formData = new FormData();

    const data = {
      userId: user?.id,
      desc,
      img,
    };

    formData.append('desc', desc);
    formData.append('user', user?.id);
    formData.append('img', img[0]);
    img.length == 2 ? formData.append('img', img[1]) : null;

    // img.length == 3 ? formData.append('img', img[2]) : null;

    if (canSave) {
      try {
        await addNewPost(formData).unwrap();

        setDesc('');
        setImg([]);
        setSelectedImages([]);
        toast.success('Post added successfully');
        console.log('Post added successfully');
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };

  useEffect(() => {
    let vh = window.innerHeight * 0.01;
    // Set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success(message, {
  //       className: `${styles.error_toast}`,
  //       position: 'top-left',
  //       // zIndex: 10000,
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // }, [message]);

  // const userId = user?.data.user._id;

  useEffect(() => {
    // try {
    const refreshData = axios
      .get('https://league-of-billions.up.railway.app/auth/refresh', {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setCredentials({ ...res.data }));
        setLoading(false);
      })
      .catch((err) => {
        router.push('/');

        console.log(err);
      });
  }, []);

  const {
    data: post,
    isError,
    isSuccess,
    isLoading: postLoading,
  } = useGetPostQuery();

  // console.log(postLoading);
  const posts = post?.data.data;

  /* FUNCTION FOR PREVIEWING IMAGES */

  //IMAGE ONCHANGE
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setImg((previousImages) => previousImages.concat(selectedFilesArray));
    // FOR BUG IN CHROME
    event.target.value = '';
  };

  //DELETE IMAGE
  const deleteImage = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  // Reverse Post Array
  const reversedPost = posts?.slice().reverse();

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = openModal ? 'hidden' : 'auto';
  }, [openModal]);

  // console.log(user);
  if (loading) return <Loader />;
  return (
    <div className={styles.home}>
      <Toaster />
      {/* {openModal && (
        <div className="m-10">
          <Modal closeModal={setOpenModal} />
        </div>
      )} */}

      <div className={styles.heading}>
        {/* <ToastContainer /> */}
        <h2>Home</h2>
      </div>
      <div className={styles.home_main}>
        <div className={styles.home_post}>
          <form onSubmit={handleNewPost}>
            <div className={styles.home_post__input}>
              <div className={styles.home_post__avatar}>
                {/* <img src={user.photo} alt="avatar" /> */}
                {user?.photo === 'default.jpg' ? (
                  <Image src={defaultImg} />
                ) : (
                  <img src={user?.photo} />
                )}
              </div>
              <textarea
                rows={1}
                cols={40}
                type="text"
                name="text"
                id="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="What’s on you mind?"
              />
            </div>
            <div className={styles.home_post__btn_icon}>
              <div className={styles.icons}>
                <div className={styles.upload}>
                  <button type="button" className={styles.btn_upload}>
                    <Image src={image} alt="add image" />
                    <input
                      type="file"
                      name="img"
                      id=""
                      onChange={onSelectFile}
                      multiple
                      accept="image/*, png, jpeg, jpg, image/jpeg, image/webp"
                    />
                  </button>
                </div>
                {/* <Image src={mic} alt="mic" /> */}
              </div>
              <div className={styles.submit_btn}>
                <input
                  type="submit"
                  style={{ opacity: !canSave ? 0.5 : 1 }}
                  disabled={!canSave == true ? true : false}
                />
                <div className={styles.submit_btn__load}>
                  {isLoading ? <Loading color="warning" /> : ''}
                </div>
              </div>
            </div>
            <div className={styles.images_prev_container}>
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <div className={styles.image_preview}>
                      <Image
                        src={image}
                        width={100}
                        height={100}
                        alt="upload"
                      />
                      <div onClick={deleteImage} className={styles.cancel}>
                        {/* <FaTimes /> */}
                      </div>
                    </div>
                  );
                })}
            </div>
            {selectedImages.length > 2 ? (
              <p className="text-[1.2rem] text-[red]">
                You can only upload up to two images
              </p>
            ) : null}
          </form>
        </div>
        {postLoading ? (
          <div className="flex justify-center pt-36 h-screen">
            <Loading
              type="default"
              size="xl"
              color="secondary"
              loadingCss={{ $$loadingSize: '7rem', $$loadingBorder: '5px' }}
            />
          </div>
        ) : (
          reversedPost?.map((post) => {
            return (
              <Post key={post._id} posts={post} user={user} token={token} />
            );
          })
        )}
      </div>
      {/* <div className={styles.sidebar_bottom}>
        <BottomNav setOpenModal={setOpenModal} />
      </div> */}
    </div>
  );
};

export default Home;
