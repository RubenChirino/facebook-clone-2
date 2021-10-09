// Firebase config
import { db } from "../../firebase";

// Firebase v9
// import { collection, query, orderBy } from "firebase/firestore";

// Firebase v8
// import { collection, query, orderBy } from "firebase/firestore";

// Firebase Hooks
import { useCollection } from "react-firebase-hooks/firestore";

// Components
import Post from "./post";
import { Fragment } from "react";

function Posts({ posts }) {
  // Firebase v9 query
  /* const postsRef = collection(db, "posts");
  const data = query(postsRef, orderBy("timestamp", "desc"));
  console.log("🚀 postsRef", postsRef); */

  // Firebase v8 query
  const data = db.collection("posts").orderBy("timestamp", "desc");
  // console.log("🚀 data", data);

  const [value, loading, error] = useCollection(data);

  return (
    <div>
      {/* error && <strong>Error: {JSON.stringify(error)}</strong> */}
      {/* loading && <span>Collection: Loading...</span> */}
      {value ? (
        <Fragment>
          {value.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          {posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
        </Fragment>
      )}
    </div>
  );
}

{
  /* JSON.stringify(doc.data()) */
}

export default Posts;
