import React, { useState, useEffect, useRef } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './social.css';

function NewPost() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    userRef: '',
    image: null,
  });

  const { title, desc, image } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData((prevState) => ({
            ...prevState,
            userRef: user.uid,
          }));
        } else {
          navigate('/signIn');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  // ... (Previous code)

  const onSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    try {
      let downloadURL = null;
  
      if (image) {
        // Upload the image to Cloud Storage
        const imageRef = ref(storage, `posts/${formData.userRef}/${image.name}`);
        await uploadBytes(imageRef, image);
        downloadURL = await getDownloadURL(imageRef);
      }
  
      // Update formDataCopy with the download URL
      const formDataCopy = {
        ...formData,
        image: downloadURL, // Store the download URL instead of the File object
        likes: 0,
        dislikes: 0,
        timestamp: serverTimestamp(),
      };
  
      await addDoc(collection(db, 'posts'), formDataCopy);
  
      setLoading(false);
      toast.success('New post published!');
      navigate(`/Social`);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      toast.error('Error saving post');
      console.error(error);
    }
  };
  

// ... (Remaining code)


  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  };

  if (loading) {
    return null; // Replace with your loading component if desired
  }

  return (
    <div className="newPost">
      <h2>Create new post</h2>
      <hr className='np-line' />
      <div className="new-wrapper">
        <form className="createNewTaskForm" onSubmit={onSubmit}>
          <label>Post title</label>
          <br />
          <input
            className="taskInput"
            id="title"
            value={title}
            onChange={onMutate}
            placeholder='     Intersting title'
            required
          />
          <br />
          <label>Post Description</label>
          <br />
          <textarea
            className="taskInput"
            id="desc"
            value={desc}
            onChange={onMutate}
            placeholder='     Say something about this post!'
            required
            style={{height: "100px", border: "2px solid black", borderRadius: "12px"}}
          />
          <br />
          <label>Add an image</label>
          <br />
          <input
            className="taskInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{ height: "100px", textAlign: "center", border: "none", width: "150px"}}
          />
          <br />
          <br />
          <button className="taskButton" type="submit">
            Create New Post!
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
