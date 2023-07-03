// import React, { useEffect, useRef, useState } from "react";
// import ChatList from "./Chatlist/ChatList";
// import Empty from "./Empty";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "@/utils/FirebaseConfig";
// import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
// import axios from "axios";
// import { useRouter } from "next/router";
// import { useStateProvider } from "@/context/StateContext";
// import { reducerCases } from "@/context/constants";
// import Chat from "./Chat/Chat";
// import { io } from "socket.io-client";
// import SearchMessages from "./Chat/SearchMessages";
// import VideoCall from "./Call/VideoCall";
// import VoiceCall from "./Call/VoiceCall";
// import IncomingVideoCall from "./common/IncomingVideoCall";
// import IncomingCall from "./common/IncomingCall";

// function Main() {
//   const [redirectLogin, setRedirectLogin] = useState(false);
//   const [socketEvent, setSocketEvent] = useState(false);
//   const [
//     {
//       userInfo,
//       currentChatUser,
//       messagesSearch,
//       videoCall,
//       voiceCall,
//       incomingVoiceCall,
//       incomingVideoCall,
//     },
//     dispatch,
//   ] = useStateProvider();
//   const router = useRouter();
//   const socket = useRef();

//   onAuthStateChanged(firebaseAuth, async (currentUser) => {
//     if (!currentUser) setRedirectLogin(true);
//     if (!userInfo && currentUser?.email) {
//       const { data } = await axios.post(CHECK_USER_ROUTE, {
//         email: currentUser.email,
//       });
//       if (!data.status) {
//         router.push("/login");
//       }
//       if (data?.data) {
//         const {
//           id,
//           name,
//           email,
//           profilePicture: profileImage,
//           status,
//         } = data.data;
//         dispatch({
//           type: reducerCases.SET_USER_INFO,
//           userInfo: {
//             id,
//             name,
//             email,
//             profilePicture: profileImage,
//             about: status,
//           },
//         });
//       }
//     }
//   });

//   useEffect(() => {
//     if (userInfo) {
//       socket.current = io(HOST);
//       socket.current.emit("add-user", userInfo?.id);
//       dispatch({ type: reducerCases.SET_SOCKET, socket });
//     }
//   }, [userInfo]);

//   useEffect(() => {
//     if (socket.current && !socketEvent) {
//       socket.current.on("msg-receive", (data) => {
//         dispatch({
//           type: reducerCases.ADD_MESSAGE,
//           newMessage: {
//             ...data.message,
//           },
//         });
//       });

//       socket.current.on("incoming-voice-call", ({ from, roomId, callType }) => {
//         dispatch({
//           type: reducerCases.SET_INCOMING_VOICE_CALL,
//           incomingVoiceCall: { ...from, roomId, callType },
//         });
//       });


//       socket.current.on("incoming-video-call", ({ from, roomId, callType }) => {
//         dispatch({
//           type: reducerCases.SET_INCOMING_VIDEO_CALL,
//           incomingVideoCall: { ...from, roomId, callType },
//         });
//       });

      
//       socket.current.on("video-call-rejected", () => {
//         dispatch({
//           type: reducerCases.END_CALL,
//         });
//       });
      
//       socket.current.on("video-call-rejected", () => {
//         dispatch({
//           type: reducerCases.END_CALL,
//         });
//       });
      
//       socket.current.on("online-users", ({onlineUsers}) => {
//         dispatch({
//           type: reducerCases.SET_ONLINE_USERS,
//           onlineUsers,
//         });
//       });


//       setSocketEvent(true);
//     }
//   }, [socket.current]);

//   useEffect(() => {
//     const getMessages = async () => {
//       const {
//         data: { messages },
//       } = await axios.get(
//         `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
//       );
//       dispatch({ type: reducerCases.SET_MESSAGES, messages });
//     };
//     if (currentChatUser?.id) {
//       getMessages();
//     }
//   }, [currentChatUser]);

//   return (
//     <>

//     {incomingVideoCall && <IncomingVideoCall />}
//     {incomingVoiceCall && <IncomingCall/>}

//       {videoCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VideoCall />
//         </div>
//       )}

//       {voiceCall && (
//         <div className="h-screen w-screen max-h-full overflow-hidden">
//           <VoiceCall />
//         </div>
//       )}

//       {!videoCall && !voiceCall && (
//         <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
//           <ChatList />
//           {currentChatUser ? (
//             <div
//               className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}
//             >
//               <Chat />
//               {messagesSearch && <SearchMessages />}
//             </div>
//           ) : (
//             <Empty />
//           )}
//         </div>
//       )}
//     </>
//   );
// }

// export default Main;


import React, { useEffect, useRef, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";
import { io } from "socket.io-client";
import SearchMessages from "./Chat/SearchMessages";
import VideoCall from "./Call/VideoCall";
import VoiceCall from "./Call/VoiceCall";
import IncomingVideoCall from "./common/IncomingVideoCall";
import IncomingCall from "./common/IncomingCall";

function Main() {
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [socketEvent, setSocketEvent] = useState(false);
  const [
    {
      userInfo,
      currentChatUser,
      messagesSearch,
      videoCall,
      voiceCall,
      incomingVoiceCall,
      incomingVideoCall,
    },
    dispatch,
  ] = useStateProvider();
  const router = useRouter();
  const socket = useRef();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const currentUser = firebaseAuth.currentUser;
      if (!currentUser) {
        setRedirectLogin(true);
      } else {
        const { data } = await axios.post(CHECK_USER_ROUTE, {
          email: currentUser.email,
        });

        if (!data.status) {
          router.push("/login");
        }

        if (data?.data) {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            status,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profilePicture: profileImage,
              about: status,
            },
          });
        }
      }
    };

    const checkAuthState = onAuthStateChanged(firebaseAuth, checkUserLoggedIn);

    return () => {
      // Cleanup function to unsubscribe from the auth state observer
      checkAuthState();
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST);
      socket.current.emit("add-user", userInfo?.id);
      dispatch({ type: reducerCases.SET_SOCKET, socket });
    }
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-receive", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      socket.current.on(
        "incoming-voice-call",
        ({ from, roomId, callType }) => {
          dispatch({
            type: reducerCases.SET_INCOMING_VOICE_CALL,
            incomingVoiceCall: { ...from, roomId, callType },
          });
        }
      );

      socket.current.on(
        "incoming-video-call",
        ({ from, roomId, callType }) => {
          dispatch({
            type: reducerCases.SET_INCOMING_VIDEO_CALL,
            incomingVideoCall: { ...from, roomId, callType },
          });
        }
      );

      socket.current.on("video-call-rejected", () => {
        dispatch({
          type: reducerCases.END_CALL,
        });
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        dispatch({
          type: reducerCases.SET_ONLINE_USERS,
          onlineUsers,
        });
      });

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };
    if (currentChatUser?.id) {
      getMessages();
    }
  }, [currentChatUser]);

  if (redirectLogin) {
    router.push("/login");
    return null; 
  }

  return (
    <>
      {incomingVideoCall && <IncomingVideoCall />}
      {incomingVoiceCall && <IncomingCall />}

      {videoCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VideoCall />
        </div>
      )}

      {voiceCall && (
        <div className="h-screen w-screen max-h-full overflow-hidden">
          <VoiceCall />
        </div>
      )}

      {!videoCall && !voiceCall && (
        <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
          <ChatList />
          {currentChatUser ? (
            <div
              className={messagesSearch ? "grid grid-cols-2" : "grid-cols-2"}
            >
              <Chat />
              {messagesSearch && <SearchMessages />}
            </div>
          ) : (
            <Empty />
          )}
        </div>
      )}
    </>
  );
}

export default Main;
