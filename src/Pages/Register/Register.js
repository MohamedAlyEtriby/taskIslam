import React, { useState } from "react";
import "./Register.css";
import Title from "../../ReusedCompnents/Title";
import { Button, TextField } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { baseurl } from "../../BaseUrl";
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    phone: "",
    last_name: "ksjsj",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    axios
      .post(baseurl + "/customer/register", formData)
      .then((res) => {
        toast.success("Account Created !", {
          position: "top-left",
        });
      })
      .catch((error) => {
        const errors = error.response.data.errors;
        toast.error(
          `${errors.email && errors.email[0]} ${
            errors.password ? errors.password[0] : ""
          }`,
          {
            position: "top-left",
          }
        );
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="registerscreen">
      <div className="register">
        <div className="registerInputs" style={{ textAlign: "center" }}>
          <Title title={"Welcome Back!"} />
          <form onSubmit={handleSubmit}>
            <TextField
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <LocalPhoneOutlinedIcon
                    size={20}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <span style={{ marginRight: "0.5rem" }}>Name</span>
                </div>
              }
              id="margin-dense"
              margin="dense"
              fullWidth
              name="first_name"
              required
              InputLabelProps={{
                required: false,
              }}
              hideRequiredMark={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <TextField
              label={
                <div className="flex-cen">
                  <LockOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Phone </span>
                </div>
              }
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              InputLabelProps={{
                required: false,
              }}
              id="phone"
              required
              margin="normal"
              fullWidth
            />
            <TextField
              label={
                <div className="flex-cen">
                  <LockOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Email</span>
                </div>
              }
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              margin="normal"
              InputLabelProps={{
                required: false,
              }}
              fullWidth
              required
            />{" "}
            <TextField
              label={
                <div className="flex-cen">
                  <LockOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Password</span>
                </div>
              }
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              InputLabelProps={{
                required: false,
              }}
              margin="normal"
              type="password"
              fullWidth
            />
            <TextField
              label={
                <div className="flex-cen">
                  <LockOutlinedIcon size={20} />
                  <span style={{ marginLeft: "1rem" }}>Confirm Password</span>
                </div>
              }
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              id="confirmPassword"
              margin="normal"
              InputLabelProps={{
                required: false,
              }}
              fullWidth
              required
              style={{ marginBottom: "16px" }}
            />
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
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
