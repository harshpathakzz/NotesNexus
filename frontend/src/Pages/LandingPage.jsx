import Button from "@mui/material/Button";
const LandingPage = () => {
  return (
    <div>
      <Button variant="text" href="/login">
        LOGIN
      </Button>
      <Button variant="contained" href="/signup">
        Sign-up
      </Button>
    </div>
  );
};

export default LandingPage;
