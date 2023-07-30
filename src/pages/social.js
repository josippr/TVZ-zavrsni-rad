import './social.css';
import { useEffect, useState } from 'react';

//firebase collections
import { collection, getDocs, deleteDoc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
;
import { doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

//router
import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';

//addons
import { toast } from 'react-toastify'


function Social() {

    const [posts, setPosts] = useState([]);
    const [usersData, setUsersData] = useState({});
    const navigate = useNavigate();
    const auth = getAuth();
    //console.log(auth.currentUser);

    useEffect(() => {
        const fetchListings = async () => {
        try {
            const user = auth.currentUser;

            /*
            if (!user) {
            navigate('/signIn');
            return;
            }
*/
            let querySnapshot;

            // admin uid: ymenqyKBpCZnEQsCsTU8AVfneED2
            /*
            if (user.uid === 'ymenqyKBpCZnEQsCsTU8AVfneED2') {
            // Admin user, fetch all tickets
            */
            querySnapshot = await getDocs(collection(db, 'posts'));
            /*
            } else {
            // Regular user, fetch their own tickets
            const listingsRef = collection(db, 'posts');
            const q = query(listingsRef, where('userRef', '==', user.uid));
            querySnapshot = await getDocs(q);
            }
            */
            const listingData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
            }));

            setPosts(listingData);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };

        fetchListings();
    }, [auth, navigate]);

    //fetch user data
    useEffect(() => {
        const fetchUsersData = async () => {
          try {
            const usersRef = collection(db, 'users');
            const usersSnapshot = await getDocs(usersRef);
    
            const usersData = usersSnapshot.docs.reduce((acc, doc) => {
              acc[doc.id] = doc.data();
              return acc;
            }, {});
    
            setUsersData(usersData);
          } catch (error) {
            console.error('Error fetching users data:', error);
          }
        };
    
        fetchUsersData();
    }, []);

    //update likes
    const updateLikes = async (postId) => {
      try {
        const user = auth.currentUser;
    
        if (!user) {
          // User not logged in, handle this case if needed
          return;
        }
    
        const likedPostsRef = doc(db, 'likes', user.uid);
        const likedPostsDoc = await getDoc(likedPostsRef);
    
        if (likedPostsDoc.exists() && likedPostsDoc.data()[postId]) {
          // The user has already liked this post, prevent further liking
          return;
        }
    
        // The user has not liked this post, proceed to update the likes count
        const postRef = doc(db, 'posts', postId);
        const postDoc = await getDoc(postRef);
    
        if (postDoc.exists()) {
          // Get the current likes count from the document
          const currentLikes = postDoc.data().likes;
    
          // Increment the likes count by 1
          const newLikes = currentLikes + 1;
    
          // Update the Firestore document with the new likes count
          await updateDoc(postRef, { likes: newLikes });
    
          // Update the local state to reflect the updated likes count
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, likes: newLikes } : post
            )
          );
    
          // Add the liked post to the user's liked posts collection
          await setDoc(likedPostsRef, { [postId]: true }, { merge: true });
        }
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };
    
    

    //function to check if user already liked this post
    const userLikedPost = (postId) => {
      const user = auth.currentUser;
    
      if (!user) {
        // User not logged in
        return false;
      }
    
      // Check if the post is in the user's liked posts
      const likedPostsDoc = usersData[user.uid];
      return likedPostsDoc && likedPostsDoc[postId];
    };

    //updateDislikes function, for updating Dislikes field and updating Dislikes number in UI
    const updateDislikes = async (postId) => {
      try {
        const user = auth.currentUser;
  
        if (!user) {
          // User not logged in, handle this case if needed
          return;
        }
  
        const dislikedPostsRef = doc(db, 'dislikes', user.uid);
        const dislikedPostsDoc = await getDoc(dislikedPostsRef);
  
        if (dislikedPostsDoc.exists() && dislikedPostsDoc.data()[postId]) {
          // The user has already disliked this post, prevent further disliking
          return;
        }
  
        // The user has not disliked this post, proceed to update the dislikes count
        const postRef = doc(db, 'posts', postId);
        const postDoc = await getDoc(postRef);
  
        if (postDoc.exists()) {
          // Get the current dislikes count from the document
          const currentDislikes = postDoc.data().dislikes;
  
          // Increment the dislikes count by 1
          const newDislikes = currentDislikes + 1;
  
          // Update the Firestore document with the new dislikes count
          await updateDoc(postRef, { dislikes: newDislikes });
  
          // Update the local state to reflect the updated dislikes count
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, dislikes: newDislikes } : post
            )
          );
  
          // Add the disliked post to the user's disliked posts collection
          await setDoc(dislikedPostsRef, { [postId]: true }, { merge: true });
        }
      } catch (error) {
        console.error('Error updating dislikes:', error);
      }
    };
  
    // Function to check if user already disliked this post
    const userDislikedPost = (postId) => {
      const user = auth.currentUser;
  
      if (!user) {
        // User not logged in
        return false;
      }
  
      // Check if the post is in the user's disliked posts
      const dislikedPostsDoc = usersData[user.uid];
      return dislikedPostsDoc && dislikedPostsDoc[postId];
    };


    //handleDelete function, to delete posts and redirect back to Social page after successfull deleting
    const handleDelete = async (listingId) => {
        try {
        const user = auth.currentUser;

        if (user.uid === 'ymenqyKBpCZnEQsCsTU8AVfneED2') {
            // Admin user, delete the ticket directly
            await deleteDoc(doc(db, 'posts', listingId));
            toast.success('Ticket closed.');
        } else {
            // Regular user, check if the ticket belongs to the user before deleting
            const listingRef = doc(db, 'posts', listingId);
            const listingDoc = await getDoc(listingRef);

            if (listingDoc.exists() && listingDoc.data().userRef === user.uid) {
            await deleteDoc(listingRef);
            toast.success('Ticket closed.');
            } else {
            toast.error('You do not have permission to delete this ticket.');
            
            return;
            }
        }

        navigate(`/Social`);
        } catch (error) {
        toast.error('Could not delete ticket');
        console.log(error);
        }
    };



    return (
      <div className='social-wrapper'>
        <div className='social-content'>
          <main className='main'>
            <h1 className='main-h1'>Social</h1>
            <ul className='categoryListings'>
              {posts.map((post) => (
                <div className='social-item' key={post.id}>
                  <p className='p-inline'>
                    Posted by:{' '}
                    {usersData[post.userRef]
                      ? usersData[post.userRef].name
                      : 'Loading username...'}
                  </p>
                  <h2>{post.title}</h2>
                  <p>{post.desc}</p>
                  <img width='95%' height='auto' src={post.image} alt='Post' style={{borderRadius: "12px"}}/>
    
                  <br />
                  <p className='soc-count'>
                    Likes: {post.likes} | Dislikes: {post.dislikes}
                  </p>
                  <button
                    className={`like-btn${userLikedPost(post.id) ? ' disabled-btn' : ''}`}
                    id='like-btn'
                    onClick={() => updateLikes(post.id)}
                    disabled={userLikedPost(post.id)}
                  >
                    <i className='fa-regular fa-thumbs-up'></i>
                  </button>
                  <button
                    className={`like-btn${userDislikedPost(post.id) ? ' disabled-btn' : ''}`}
                    id='dislike-btn'
                    onClick={() => updateDislikes(post.id)}
                    disabled={userDislikedPost(post.id)}
                  >
                    <i className='fa-regular fa-thumbs-down'></i>
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className='like-btn'
                    style={{ backgroundColor: '#e5523a' }}
                  >
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </div>
              ))}
            </ul>
          </main>
        </div>
        <Link to='/NewPost'>
          <div className='newPostBtn'>
            <i className='fa-solid fa-plus'></i>
          </div>
        </Link>
      </div>
    );
    
    
    
    

}

export default Social;