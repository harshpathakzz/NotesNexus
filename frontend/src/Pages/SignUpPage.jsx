import { useState } from "react";
import axios from "axios";
import { TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Toast from "../components/Toast";
const SignUpContainer = styled(Grid)(({ theme }) => ({
  margin: "auto",
  padding: "16px",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("https://ibb.co/MMKqNq6");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);
  const handlePicChange = (e) => {
    postDetails(e.target.files[0]);
  };
  const handleToastClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setSeverity("error");
      setMessage("Password and Confirm Password do not match");
      setOpen(true);
      return;
    } else {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = axios.post(
          "http://localhost:5000/api/users",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setSeverity("error");
        setMessage(error.response.data.message);
        setOpen(true);
      }
    }
  };

  const postDetails = (pics) => {
    if (pics === "https://ibb.co/MMKqNq6") {
      setSeverity("error");
      setMessage("Password and Confirm Password do not match");
      setOpen(true);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "NotesNexus");
      data.append("cloud_name", "dt3sth88l");
      fetch("https://api.cloudinary.com/v1_1/dt3sth88l/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSeverity("error");
      setMessage("Please select an image");
      setOpen(true);

      return;
    }
  };

  return (
    <SignUpContainer container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <input
            accept="image/*"
            id="profilePicture"
            type="file"
            onChange={handlePicChange}
          />
          <label htmlFor="profilePicture">
            <Button variant="contained" component="span">
              Upload Profile Picture
            </Button>
          </label>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </form>
        <Toast
          open={open}
          severity={severity}
          message={message}
          onClose={handleToastClose}
        />
      </Grid>
    </SignUpContainer>
  );
};

export default SignUpPage;
