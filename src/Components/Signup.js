import { useState } from "react";
import { db, auth } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    user_id: "",
    user_name: "",
    user_pw: "",
  });

  const { user_id, user_name, user_pw } = inputValue;

  // 이메일 유효성 검사
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  // 비밀번호 유효성 검사
  const pwRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,15}$/;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  //
  const signup = async () => {
    if (emailRegExp.test(user_id)) {
      if (pwRegExp.test(user_pw)) {
        const user = await createUserWithEmailAndPassword(
          auth,
          user_id,
          user_pw
        );
        const user_data = await addDoc(collection(db, "user-info"), {
          user_id: user_id,
          user_pw: user_pw,
          user_name: user_name,
        });
      } else {
        alert("8~15자 영문, 숫자를 조합해주세요 :(");
      }
    } else {
      alert("유효한 이메일 형식이 아닙니다 :(");
    }
  };

  return (
    <div>
      아이디(이메일) :{" "}
      <input
        type="text"
        name="user_id"
        value={user_id}
        placeholder=""
        onChange={onChange}
      />
      이름 :{" "}
      <input
        type="text"
        name="user_name"
        value={user_name}
        placeholder=""
        onChange={onChange}
      />
      비밀번호 :{" "}
      <input
        type="text"
        name="user_pw"
        value={user_pw}
        placeholder=""
        onChange={onChange}
      />
      <button onClick={signup}>회원가입</button>
    </div>
  );
};

export default Signup;
