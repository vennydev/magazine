import styled from "styled-components";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import CreateButton from "@mui/material/Button";
import { auth, db, storage } from "../shared/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRef } from "react";
import {
  getDoc,
  getDocs,
  addDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

const WritePost = () => {
  const image_ref = useRef(null);
  const [post, setPost] = useState({
    post_author: "",
    post_imageURL: "",
    post_time: "",
    post_text: "",
    post_layoutValue: "",
  });

  const { post_author, post_image, post_time, post_text, post_layoutValue } =
    post;

  // 1. post_image 업로드하기
  // - Storage에 사진 업로드하고 저장된 파일의 url 받아옴
  const uploadFB = async (e) => {
    const selected_filename = e.target.files[0];
    const storageRef = ref(storage, `images/${selected_filename.name}`);
    const uploaded_file = await uploadBytes(storageRef, selected_filename);
    const file_url = await getDownloadURL(uploaded_file.ref);

    setPost({ ...post, post_imageURL: file_url });
  };

  // 2. user_name 업로드하기
  //현재 로그인 중인 유저의 이메일과 firestore docs에 입력되어있는 유저의 이메일이 매칭되는 doc을 찾는다.
  //해당 doc의 user_name을 가져온다.
  const updateUserName = async () => {
    const userRef = collection(db, "user-info");
    const q = query(userRef, where("user_id", "==", "hs421@aaa.com"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPost({ ...post, post_author: doc.data().user_name });
    });
  };

  const postingBtn = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    console.log(year, month, day);
  };

  useEffect(() => {
    updateUserName();
  }, []);

  return (
    <WritePostStyle className="layout-wrapper">
      <input type="file" onChange={uploadFB} />
      <div>
        <input type="radio" name="layout" id="left" />
        <label htmlFor="left">
          <strong>왼쪽에 이미지 오른쪽에 텍스트</strong>
        </label>
      </div>
      <LayoutWrapper className="layout first-layout">
        <LayoutColumn image>
          <strong>Image</strong>
        </LayoutColumn>
        <LayoutColumn text>
          <div>Text</div>
        </LayoutColumn>
      </LayoutWrapper>

      <div>
        <input type="radio" name="layout" id="right" />
        <label htmlFor="right">
          <strong>왼쪽에 텍스트 오른쪽에 이미지</strong>
        </label>
      </div>
      <LayoutWrapper className="layout second-layout">
        <LayoutColumn text>
          <div>Text</div>
        </LayoutColumn>
        <LayoutColumn image>
          <strong>Image</strong>
        </LayoutColumn>
      </LayoutWrapper>

      <div>
        <input type="radio" name="layout" id="top" />
        <label htmlFor="topt">
          <strong>아래에 텍스트 위에 이미지</strong>
        </label>
      </div>
      <LayoutWrapper className="layout third-layout">
        <LayoutColumn image>
          <strong>Image</strong>
        </LayoutColumn>
        <LayoutColumn text>
          <div>Text</div>
        </LayoutColumn>
      </LayoutWrapper>
      <TextareaAutosize
        maxRows={6}
        aria-label="maximum height"
        placeholder="Maximum 4 rows"
        defaultValue=""
        style={{
          width: "100%",
          height: 200,
          resize: "none",
          padding: "10px 20px",
        }}
      />
      <CreateButton
        variant="contained"
        onClick={postingBtn}
        style={{
          width: "50%",
          padding: "10px 20px",
          backgroudColor: "#9c88ff",
        }}
      >
        게시글 올리기
      </CreateButton>
    </WritePostStyle>
  );
};

const WritePostStyle = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const LayoutWrapper = styled.div`
  display: flex;
  min-width: 70%;
`;

const LayoutColumn = styled.div`
  background-color: ${(props) => (props.image ? "#dcdde1" : "#9c88ff")};
  color: ${(props) => (props.text ? "white" : "black")};
  padding: 10px 20px;
  width: 50%;
  text-align: center;
  line-height: 120px;
`;

export default WritePost;
