import React, { useState, useEffect, useRef } from 'react';
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';

import './workTasks.css';

function WorkTasks() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    userRef: '', // Set a default value for userRef
  });
  const [workTasks, setWorkTasks] = useState([]);

  const { title, desc } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'workTasks'), formDataCopy);
    setLoading(false);
    toast.success('New task saved!');
    navigate(`/WorkTasks`);
    // Refresh the page after form submission
    window.location.reload();
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  const handleDelete = async (workTaskId) => {
    try {
      await deleteDoc(doc(db, 'workTasks', workTaskId));
      toast.success('Task removed.');
      navigate(`/WorkTasks`);
      // Refresh the page after form submission
      window.location.reload();
    } catch (error) {
      toast.error('Could not delete task');
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'workTasks'),
        where('userRef', '==', auth.currentUser && auth.currentUser.uid) // Check if auth.currentUser is defined
      ),
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkTasks(tasks);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [auth.currentUser]);

  if (loading) {
    return null; // Replace with your loading component if desired
  }

  return (
    <div className="workTasksWrapper">
      <header className="workHeader">
        <h1>Work Tasks</h1>
      </header>
      <main className="workMain">
        <div className="createTaskWrapper">
          <div className="createTaskTitle">Create new task</div>
          <form className="createNewTaskForm" onSubmit={onSubmit}>
            <label>Work title</label>
            <br />
            <input
              className="taskInput"
              id="title"
              value={title}
              onChange={onMutate}
              required
            ></input>
            <br />
            <label>Work description</label>
            <br />
            <input
              className="taskInput"
              id="desc"
              value={desc}
              onChange={onMutate}
              required
            ></input>
            <br />
            <button className="taskButton" type="submit">
              Create New Task!
            </button>
          </form>
        </div>
        <div className="createdTasksWrapper">
          <div className="createdTask">
            <ul className="categoryListings">
              {workTasks.map((workTask) => (
                <div className="listingItem" key={workTask.id}>
                  <div className='task-content'>
                    <h2>{workTask.title}</h2>
                    <p>{workTask.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(workTask.id)}
                    className="deleteBtn"
                    style={{backgroundColor: "#215291", width: "200px"}}
                  >
                    Complete & close task
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WorkTasks;
