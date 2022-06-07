import { useRef, useState } from "react";
import { db, auth } from "../shared/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const Signup = () => {
  const [inputValue, setInputValue] = useState({
    user_id: "",
    user_name: "",
    user_pw: "",
  });
  let navigation = useNavigate();
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const pwRef = useRef(null);
  //   const nameRefCur = nameRef.current.className;
  //   const pwRefCur = pwRef.current.className;

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

  const signup = async () => {
    if (emailRegExp.test(user_id)) {
      if (pwRegExp.test(user_pw)) {
        // auth에 user 등록
        const user = await createUserWithEmailAndPassword(
          auth,
          user_id,
          user_pw
        );
        // firestore에 저장
        const user_data = await addDoc(collection(db, "user-info"), {
          user_id: user_id,
          user_pw: user_pw,
          user_name: user_name,
        });
        if (auth) {
          signOut(auth);
          alert("회원가입을 축하드립니다 :)");
          navigation("/login");
        }
      } else {
        alert("8~15자 영문, 숫자를 조합해주세요 :(");
        pwRef.current.focus();
      }
    } else {
      alert("유효한 이메일 형식이 아닙니다 :(");
      emailRef.current.focus();
    }
  };

  return (
    <div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="user_id"
            value={user_id}
            placeholder="example@email.com"
            onChange={onChange}
            ref={emailRef}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="user_name"
            value={user_name}
            placeholder="Name"
            onChange={onChange}
            ref={nameRef}
          />
        </div>
        {/* <p className="help is-success">This username is available</p> */}
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="user_pw"
            value={user_pw}
            placeholder="Password"
            onChange={onChange}
            ref={pwRef}
          />
        </div>
        {/* <p className="help is-danger">This email is invalid</p> */}
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button onClick={signup} className="button is-link">
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
