import { useState } from "react";
import { auth } from "../shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [inputstate, setInputstate] = useState({ user_id: "", user_name: "" });
  const { user_id, user_pw } = inputstate;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputstate({ ...inputstate, [name]: value });
  };

  const login = async () => {
    const user = await signInWithEmailAndPassword(auth, user_id, user_pw);
    console.log(user);
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
            value={user_id || ""}
            placeholder="example@email.com"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name="user_pw"
            value={user_pw || ""}
            placeholder="Password"
            onChange={onChange}
          />
        </div>
        {/* <p className="help is-danger">This email is invalid</p> */}
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={login}>
            Login
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
