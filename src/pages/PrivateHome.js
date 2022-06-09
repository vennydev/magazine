// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadPostsFB } from "../redux/modules/posts";
import styled from "styled-components";
import { AiFillMeh } from "react-icons/ai";

// components
import WritePost from "./WritePost";

const PrivateHome = () => {
  let navigation = useNavigate();

  // useEffect(() => {
  //   loadPostsFB();
  // }, []);

  return (
    <HomeStyle>
      <h1>홈페이지 입니다!</h1>

      <PostingBtn
        onClick={() => {
          navigation("/post");
        }}
      >
        <AiFillMeh />
      </PostingBtn>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  background-color: yellow;
  width: 100%;
  height: 100%;
  border: 0;
`;

const PostingBtn = styled.button`
  all: unset;
  cursor: pointer;
  font-size: 70px;
  transition: all 0.2s ease-in-out;
  position: fixed;
  right: 0;
  bottom: 20px;
  right: 40px;
  :hover {
    transform: scale(1.5);
  }
`;

export default PrivateHome;
