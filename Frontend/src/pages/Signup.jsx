import "../styles/signup.css";

import { useState } from "react";

import axios from "axios";

import {
  Link,
  useNavigate
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const response = await axios.post(

        "http://localhost:8080/signup",

        {
          email: email,
          password: password
        }

      );

      alert(response.data);

      navigate("/");

    }

    catch (error) {

      console.error(error);

      alert("Signup Failed");

    }

  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h1>SentinelMesh</h1>

        <p>Create Your Secure Account</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button onClick={handleSignup}>

          Signup

        </button>

        <p className="login-link">

          Already have an account?

          {" "}

          <Link to="/">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;