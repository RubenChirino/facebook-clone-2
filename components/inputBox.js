import Image from "next/image";
import { useRef, useState } from "react";

// Icons
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";

// Auth
import { useSession } from "next-auth/client";

// Firestore Config
import { db, storage } from "../firebase";

// Firestore v9
/* import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore"; */

// Firestore v8
import firebase from "firebase";

function InputBox() {
  const [session] = useSession();
  const inputTextRef = useRef(null);
  const filepickerRef = useRef(null);

  const [imageToPost, setImageToPost] = useState(null);

  const sendPost = async (e) => {
    e.preventDefault();
    if (!inputTextRef.current.value) return;
    inputTextRef.current.disabled = true;

    try {
      const collectionName = "posts";

      const post = {
        message: inputTextRef.current.value,
        name: session?.user.name || "Ruben Chirino",
        email: session?.user.email || "ruben@domain.com",
        image: session?.user.image || "/images/profiles/ruben.jpg",
        timestamp: undefined,
      };

      /* === Add new doc on Firabase v9 (Modular Version)  === */
      /* post.timestamp = Timestamp.now();
      const docRef = await addDoc(collection(db, collectionName), post).then(
        (docSaved) => {
          if (imageToPost) {
            // console.log("🚀 docSaved info =>", docSaved);
            const storageRef = ref(storage, `${collectionName}/${docSaved.id}`);
            uploadString(storageRef, imageToPost, "data_url")
              .then(() => {
                // When the upload is complete
                getDownloadURL(storageRef).then(async (url) => {
                  await setDoc(
                    doc(db, collectionName, docSaved.id),
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
              })
              .catch((error) => console.error(error));
            removeImage();
          }
        }
      ); */

      /* === Add new doc on Firabase v8 === */
      post.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      db.collection(collectionName)
        .add(post)
        .then((doc) => {
          if (imageToPost) {
            const uploadTask = storage
              .ref(`${collectionName}/${doc.id}`)
              .putString(imageToPost, "data_url");
            /* == */
            removeImage();
            /* == */
            uploadTask.on(
              "state_change",
              null,
              (error) => console.error(error),
              () => {
                // When the upload is complete
                storage
                  .ref(`${collectionName}/${doc.id}`)
                  .getDownloadURL()
                  .then((url) => {
                    db.collection(collectionName).doc(doc.id).set(
                      {
                        postImage: url,
                      },
                      { merge: true }
                    );
                  });
              }
            );
            /* == */
          }
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    inputTextRef.current.disabled = false;

    inputTextRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const userImage = e.target.files[0];

    // === Validate Extension ===
    let isFormatAllowed = false;

    switch (userImage.type) {
      case "image/png":
        isFormatAllowed = true;
        break;

      case "image/jpeg":
        isFormatAllowed = true;
        break;

      default:
        break;
    }

    if (!isFormatAllowed) {
      alert("The file format is not allowed. Try PNG or JPG.");
      e.target.value = "";
      return false;
    }

    // BUSSINES LOGIC

    const reader = new FileReader();
    if (userImage) {
      reader.readAsDataURL(userImage);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session?.user.image || "/images/profiles/ruben.jpg"}
          alt="user-profile-photo"
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputTextRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${
              session?.user.name || "Ruben Chirino"
            }?`}
            name=""
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="Image to post"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            hidden
            onChange={addImageToPost}
            type="file"
            accept="image/png,image/jpeg"
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
