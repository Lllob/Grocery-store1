import { useNavigate } from 'react-router-dom';
import * as authService from "../../services/authService";
import { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";


const Register = () => {
  const [errorEm, setErrEmail] = useState(false)
  const [errorPss, setErrorPass] = useState(false)
  const [message, setMessige] = useState('')
  const [messigePass, setMessigePass] = useState('')
  const { userLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
      e.preventDefault();

       const formData = new FormData(e.target); 
      const username = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      const repass = formData.get('repass')
     
      let em = email
      let emRegex = /([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z-]+)$/
      let hasMatch = em.match(emRegex)
      //console.log(hasMatch)
      if (!!hasMatch === false) {
        setErrEmail(true)
        setMessige('email is not valid')
      } else {
        setErrEmail(false)
        setMessige('')
      }
      

      if (password.length < 2) {
        setErrorPass(true)
        setMessigePass('Password mast be at least twe character long')
        //return alert('Email or Password mast be at least two character long')
      } else {
        setErrorPass(false)
      }
      
      if (password !== repass) {
        return alert('Password don/t match')
      }
  
   
      authService.register(username, email, password)
          .then(userData => {
           // console.log(`Register ${userData}`)
           if (userData.error) {
            alert(userData.error['message'])
            return;
           }
             userLogin(userData);
               if (userData) {
                alert("Data saved succesfully");
              }
             
                navigate('/');
      });
      
     
    }

  return(
    <section id="register-page" className="register">
      <form onSubmit={onSubmit} id="register-form" action="/register" method="POST">
        <fieldset>
          <legend>Register Form</legend>
          <p className="field">
          <label>Username</label>
        <input type="text" name="username" placeholder="Username.." />
            <label htmlFor="email">Email</label>
            <span className="input">
            {errorEm ? <input className="err" type="text" name="email" id="email" placeholder={message} /> 
             : <input type="text" name="email" id="email" placeholder="Email" />
            }
            </span>
          </p>
          <p className="field">
            <label htmlFor="password">Password</label>
            <span className="input">
            {errorPss ? <input className="err"
                type="password"
                name="password"
                id="password"
                placeholder={messigePass}
              />
               : <input type="password" name="password" id="password"
               placeholder="Password" 
               />}
            </span>
          </p>
          <p className="field">
            <label htmlFor="repeat-pass">Repeat Password</label>
            <span className="input">
              <input
                type="password"
                name="repass"
                id="repass"
                placeholder="Repeat Password"
              />
            </span>
          </p>
          <input
            className="button submit"
            type="submit"
            defaultValue="Register"
          />
        </fieldset>
      </form>
    </section>
  )
};

export default Register;
