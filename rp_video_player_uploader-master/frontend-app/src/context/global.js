import React, { useEffect } from "react";

const GlobalContext = React.createContext();

//actions
const LOADING = "LOADING";
const SET_VIDEOS = "SET_VIDEOS";
const SET_SELECTED_VIDEO = "SET_SELECTED_VIDEO";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case SET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: [
          ...action.payload.map((video) => {
            return {
              ...video,
              videoUrl: `http://localhost:8000/public/videos/${video.filename}`,
            };
          }),
        ],
      };
    default:
      return state;
  }

  return state;
};

export const GlobalProvider = ({ children }) => {
  const initialState = {
    videos: [],
    loading: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  //get videos
  const getAllVideos = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/videos");
      const data = await res.json();

      dispatch({ type: SET_VIDEOS, payload: data.videos });
    } catch (error) {}
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        getAllVideos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};

// import React, { useEffect } from "react";

// const GlobalContext = React.createContext();

// // Define actions
// const LOADING = "LOADING";
// const SET_VIDEOS = "SET_VIDEOS";
// const SET_QUIZZES = "SET_QUIZZES"; // New action for quizzes

// const reducer = (state, action) => {
//   switch (action.type) {
//     case LOADING:
//       return { ...state, loading: true };
//     case SET_VIDEOS:
//       return {
//         ...state,
//         loading: false,
//         videos: action.payload.videos.map((video) => ({
//           ...video,
//           videoUrl: `http://localhost:8000/public/videos/${video.filename}`,
//         })),
//       };
//     case SET_QUIZZES: // Handle setting quizzes
//       return {
//         ...state,
//         quizzes: action.payload.quizzes,
//       };
//     default:
//       return state;
//   }
// };

// export const GlobalProvider = ({ children }) => {
//   const initialState = {
//     videos: [],
//     quizzes: [], // Store quizzes in state
//     loading: false,
//   };

//   const [state, dispatch] = React.useReducer(reducer, initialState);

//   // Fetch videos and quizzes
//   const getAllVideosAndQuizzes = async () => {
//     dispatch({ type: LOADING });
//     try {
//       const res = await fetch("http://localhost:8000/api/videos");
//       const data = await res.json();

//       dispatch({ type: SET_VIDEOS, payload: { videos: data.videos } });
//       // Optionally fetch quizzes here or assume quizzes come with the video data
//       const quizRes = await fetch("http://localhost:8000/api/quizzes"); // Adjust URL as needed
//       const quizData = await quizRes.json();
//       dispatch({ type: SET_QUIZZES, payload: { quizzes: quizData.quizzes } });
//     } catch (error) {
//       console.error("Failed to fetch data", error);
//     }
//   };

//   useEffect(() => {
//     getAllVideosAndQuizzes();
//   }, []);

//   return (
//     <GlobalContext.Provider
//       value={{
//         ...state,
//         getAllVideosAndQuizzes,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };

// export const useGlobalContext = () => React.useContext(GlobalContext);
