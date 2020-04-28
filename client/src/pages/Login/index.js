import React, { useState } from "react";
import Cookie from "js-cookie";
import api from "../../services/api";
import "./style.css";
import { Link, Redirect } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const login = async () => {
    try {
      const login = await api.post("/users/login", values);
      Cookie.set("auth", login.data.token);
      setAuth(true);
    } catch (e) {
      console.log(e);
    }
  };
  if (auth) return <Redirect to="/book" />;

  return (
    <>
      <main>
        <div className="content-login">
          <RiAccountCircleLine size={90} />
          <div className="form-group-login">
            <label>
              <strong>Email:</strong>
            </label>
            <input
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              placeholder="Digite seu email cadastrado"
            />
          </div>
          <div className="form-group-login">
            <label>
              <strong>Senha:</strong>
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
          </div>

          <button
            className="button-login"
            type="button"
            onClick={() => login()}
          >
            Entrar
          </button>

          <Link to="/signup">Não tem cadastro? Clique aqui</Link>
        </div>
      </main>
    </>
  );
}
