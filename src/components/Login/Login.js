import { useContext } from "react";
import { useNavigate } from "react-router-dom"; 

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (e) => {
      e.preventDefault();

      const {
          email,
          password,
      } = Object.fromEntries(new FormData(e.target));

      if (email === '' || password === '') {
        return alert('Pleas, fill all fields!')
    }

      authService.login(email, password)
          .then(userData => {
            if (userData.error) {
              //console.log(userData.error['message'])
              alert(userData.error['message'])
              return;
             }
              userLogin(userData);
               navigate('/');
          })
  };

  return(
    <section id="login-page" className="login">
      <form onSubmit={onSubmit} id="login-form" action="/login" method="POST">
        <fieldset>
          <legend>Login Form</legend>
          <p className="field">
            <label htmlFor="email">Email</label>
            <span className="input">
              <input type="text" name="email" id="email" placeholder="Email" />
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </span>
          </p>
          <input className="button submit" type="submit" defaultValue="Login" />
        </fieldset>
      </form>
    </section>
  )
}


export default Login;
