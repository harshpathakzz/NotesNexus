import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
const Card = ({ _id, title, content, category }) => {
  const deleteHandler = (_id) => {
    console.log(_id);
  };
  return (
    <div>
      <Accordion sx={{ my: "1rem" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Chip
            label={category}
            sx={{ mr: "1rem" }}
            color="secondary"
            variant="outlined"
            size="small"
          />
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              href={`/note/${_id}`}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteHandler(_id);
              }}
            >
              Delete
            </Button>
          </Box>
          <Box sx={{ mt: "1rem" }}>
            <Typography>{content}</Typography>
          </Box>

          <Box sx={{ mt: "1rem" }}>
            <Typography sx={{ fontWeight: "lighter", opacity: 0.5 }}>
              Created on - Date
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Card;
