// module
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
// import Moment from "react-moment";

const WritePost = () => {
  const text_ref = useRef(null);
  const uploadFileInput_ref = useRef(null);
  const layoutValue_ref = useRef(null);

  const [post, setPost] = useState({
    post_author: "",
    post_imageURL: "",
    post_time: "",
    post_text: "",
    post_layoutValue: "",
  });

  const { post_author, post_image, post_time, post_text, post_layoutValue } =
    post;

  // 1. post_image 업데이트
  // - Storage에 사진 업로드하고 저장된 파일의 url 받아옴
  const uploadFB = async (e) => {
    const selected_filename = e.target.files[0];
    const storageRef = ref(storage, `images/${selected_filename.name}`);
    const uploaded_file = await uploadBytes(storageRef, selected_filename);
    const file_url = await getDownloadURL(uploaded_file.ref);
    setPost({ ...post, post_imageURL: file_url });

    uploadFileInput_ref.current.value = selected_filename.name;
  };

  // 2. post_author 업데이트
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

  // 3. post_time, post_text 업데이트
  // 게시물 등록 버튼을 누르면 게시물 등록한 시간을 ms로 구해 업데이트한다.
  const onClick = (e) => {
    const postTimestamp = +new Date();
    const textValue = text_ref.current.value;
    setPost({ ...post, post_time: postTimestamp, post_text: textValue });
  };

  // 4. post_layoutValue 업데이트
  const handleLayoutValue = (e) => {
    const layoutValue = e.target.value;
    setPost({ ...post, post_layoutValue: layoutValue });
  };

  console.log(post);

  useEffect(() => {
    console.log("유저 네임 업데이트!");
    updateUserName();
  }, []);

  return (
    <WritePostStyle>
      <div>
        <UploadForm>
          <UploadFileInput
            defaultValue="첨부파일"
            placeholder="첨부파일"
            ref={uploadFileInput_ref}
          ></UploadFileInput>
          <UploadFileLabel htmlFor="file">파일찾기</UploadFileLabel>
        </UploadForm>
      </div>
      <UploadFileBtn
        type="file"
        id="file"
        defaultValue=""
        onChange={uploadFB}
      />

      <Column>
        <div>
          <input
            type="radio"
            name="layout"
            id="left"
            value="textLeft"
            onChange={handleLayoutValue}
          />
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
      </Column>
      <Column>
        <div>
          <input
            type="radio"
            name="layout"
            id="right"
            value="textRight"
            onChange={handleLayoutValue}
          />
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
      </Column>
      <Column>
        <div>
          <input
            type="radio"
            name="layout"
            id="below"
            value="textBelow"
            onChange={handleLayoutValue}
          />
          <label htmlFor="below">
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
      </Column>

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
        ref={text_ref}
      />
      <CreateButton
        variant="contained"
        onClick={onClick}
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

const WritePostStyle = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  text-align: center;
`;

const UploadForm = styled.div``;

const UploadFileInput = styled.input`
  display: inline-block;
  margin-bottom: 10px;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 100%;
  color: #999999;
`;

const UploadFileLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
`;

const UploadFileBtn = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const Column = styled.div`
  width: 70%;
  text-align: center;
`;

const LayoutWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
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
