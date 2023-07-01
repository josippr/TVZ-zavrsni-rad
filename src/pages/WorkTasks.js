import { useState, useEffect, useRef } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

import './workTasks.css';

function WorkTasks() {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
    })

    const {
        title,
        desc,
    } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              setFormData({ ...formData, userRef: user.uid })
            } else {
              navigate('/sign-in')
            }
          })
        }
    
        return () => {
          isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isMounted])
    
      const onSubmit = async (e) => {
        e.preventDefault()
    
        setLoading(true)
        
        const formDataCopy = {
          ...formData,
          //geolocation,
          timestamp: serverTimestamp(),
        }
    
        // !formDataCopy.offer && delete formDataCopy.discountedPrice
    
        const docRef = await addDoc(collection(db, 'workTasks'), formDataCopy)
        setLoading(false)
        toast.success('New task saved!')
        navigate(`/WorkTasks`)
      }
    
      const onMutate = (e) => {
        let boolean = null
    
        if (e.target.value === 'true') {
          boolean = true
        }
        if (e.target.value === 'false') {
          boolean = false
        }
    
        // Files
        if (e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            images: e.target.files,
          }))
        }
    
        // Text/Booleans/Numbers
        if (!e.target.files) {
          setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: boolean ?? e.target.value,
          }))
        }
      }
    
      if (loading) {
        return 
      }



        //get all tasks from 'workTasks' collection:

        async function getTasks() {
            const tasksRef = db.collection('workTasks');
            const snapshot = await tasksRef.get();
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        }

        


    return (
        <div className="workTasksWrapper">
            <header className='workHeader'>
                <h1>Work Tasks</h1>
            </header>
            <main className='workMain'>
                <div className='createTaskWrapper'>
                    <div className='createTaskTitle'>
                        Create new task
                        
                    </div>
                    <form className='createNewTaskForm' onSubmit={onSubmit}>
                            <label>
                                Work title
                            </label><br />
                            <input className='taskInput' 
                                    id='title'
                                    value={title}
                                    onChange={onMutate}
                                    required>
                            </input><br />
                            <label>
                                Work description
                            </label><br />
                            <input className='taskInput' 
                                    id='desc'
                                    value={desc}
                                    onChange={onMutate}
                                    required></input><br />
                            <button className='taskButton' type='submit'>Create New Task!</button>
                    </form>
                </div>
                <div className='createdTasksWrapper'>
                    <div className='createdTask'>{}</div>
                </div>
            </main>
        </div>
    )
}

export default WorkTasks;