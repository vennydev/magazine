import {
  collection,
  getDocs,
  // doc,
  // getDoc,
  // addDoc,
  // updateDoc,
  // deleteDoc,
} from "firebase/firestore";
import { db } from "../../shared/firebase";

//  action
const LOAD = "post/LOAD";

// initial state
const initialState = {
  list: [
    {
      text: "아이번에어렵네",
      image: "https://miro.medium.com/max/1200/0*XCgoYU9sqt95P8J0.png",
      posted_ago: "10분전",
    },
    {
      text: "대하소금구이랑 대게 먹고싶다",
      image:
        "https://www.newstown.co.kr/news/photo/202007/461902_367622_30.jpg",
      posted_ago: "12분전",
    },
    {
      text: "장난아님",
      image: "http://image.auction.co.kr/itemimage/23/05/5f/23055f4ef5.jpg",
      posted_ago: "20분전",
    },
  ],
};

// action creator
export const loadPosts = (post_list) => {
  return { type: LOAD, post_list: post_list };
};

// middleware(communicat with firebase)
export const loadPostsFB = () => {
  return async function (dispatch) {
    const post_data = await getDocs(collection(db, "user-info"));
    let post_lst = [];
    post_data.forEach((doc) => {
      post_lst.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadPosts(post_lst));
  };
};

// reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "post/LOAD": {
      return { list: action.post_list };
    }
    default:
      return state;
  }
}
