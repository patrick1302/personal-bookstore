import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./style.css";
import { FiUserPlus } from "react-icons/fi";
import Cookie from "js-cookie";

export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const signup = async () => {
    try {
      const signup = await api.post("/users", values);
      Cookie.set("auth", signup.data.token);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <main>
        <div className="content-signup">
          <FiUserPlus size={90} />
          <div className="form-group-signup">
            <label>
              <strong>Nome:</strong>
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-signup">
            <label>
              <strong>Email:</strong>
            </label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group-signup">
            <label>
              <strong>Senha:</strong>
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <button onClick={() => signup()} className="button-signup">
            Cadastrar
          </button>
          <Link to="/">Login</Link>
        </div>
      </main>
    </>
  );
}
