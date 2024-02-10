import React, { useState } from "react";
import "./Login.css";
import Title from "../../ReusedCompnents/Title";
import { Alert, Button, TextField } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { baseurl } from "../../BaseUrl";
import axios from "axios";
import { Login } from "../../Redux/Reducers/Reducers.jsx";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
const Login1 = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { auth } = useSelector((state) => state.auth);
  const [error, seterror] = useState("");
  const [load, setload] = useState(false);
  const handleInputChange = (field) => (event) => {
    setCredentials({
      ...credentials,
      [field]: event.target.value,
    });
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleSignIn = (e) => {
    // Perform sign-in logic using the email and password state
    // Add your sign-in logic here
    setload(true);
    e.preventDefault();
    axios
      .post(baseurl + "/customer/login", credentials)
      .then((res) => {
        if (res.data) dispatch(Login(res.data));
        seterror("");
        nav("/");
      })
      .catch((er) => {
        if (er.response.data.error) seterror(er.response.data.error);
        else seterror("Something went wrong");
      })
      .finally(() => {
        setload(false);
      });
  };

  return (
    <div className="loginscreen">
      <div className="login">
        <div className="loginInputs" style={{ textAlign: "center" }}>
          <Title title={"Welcome Back!"} />
          <form onSubmit={handleSignIn}>
            <TextField
              label={
                <div className="flex-cen">
                  <LocalPhoneOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Email</span>
                </div>
              }
              id="margin-dense"
              margin="dense"
              fullWidth
              value={credentials.email}
              onChange={handleInputChange("email")}
              required
            />
            <TextField
              label={
                <div className="flex-cen">
                  <LockOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Password</span>
                </div>
              }
              id="margin-normal"
              margin="normal"
              fullWidth
              required
              type="password"
              style={{ marginBottom: "16px" }}
              value={credentials.password}
              onChange={handleInputChange("password")}
            />

            {error !== "" && (
              <Alert severity="error" style={{ marginBottom: "16px" }}>
                {error}
              </Alert>
            )}
            <Button
              fullWidth
              type="submit"
              style={{
                backgroundColor: "#342876",
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              {load === true ? (
                <ThreeDots
                  visible={true}
                  height="30"
                  width="30"
                  color="white"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login1;
