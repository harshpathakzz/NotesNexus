import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "64px",
  width: "100%",
  marginTop: "auto",
  position: "fixed",
  bottom: 0,
}));

export default function Footer() {
  return (
    <FooterContainer>
      <Typography variant="body1">
        © 2023 NotesNexus. All rights reserved.
      </Typography>
    </FooterContainer>
  );
}
