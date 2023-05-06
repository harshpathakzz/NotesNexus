import { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toast from "../components/Toast";
import axios from "axios";

const LoginContainer = styled(Grid)(({ theme }) => ({
  margin: "auto",
  padding: "16px",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleToastClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setSeverity("error");
      setMessage("Please enter email and password");
      setOpen(true);
      return;
    }
    console.log(`Email: ${email}, Password: ${password}`);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setSeverity("error");
      setMessage(error.response.data.message);
      setOpen(true);
    }
  };

  return (
    <LoginContainer container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Typography
          variant="h3"
          color={"primary"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
        <Toast
          open={open}
          severity={severity}
          message={message}
          onClose={handleToastClose}
        />
      </Grid>
    </LoginContainer>
  );
};

export default LoginPage;
