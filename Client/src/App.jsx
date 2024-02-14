import { TodoForm, TodoList } from "./components";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  function handleAddForm() {
    document.querySelector(".formContainer").classList.toggle("hidden");
  }
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 3,
        justifyContent: "start",
        alignItems: "center",
        gap: 4,
        height: "100vh",
      }}
      maxWidth="sm"
    >
      <ToastContainer theme="dark" autoClose={2000} />
      <Typography sx={{ textAlign: "center" }} variant="h2" gutterBottom>
        ToDo Application
      </Typography>
      <Button
        sx={{ width: 200, fontWeight: "bolder", fontSize: 20 }}
        variant="contained"
        onClick={handleAddForm}
      >
        ADD
      </Button>

      <TodoList />

      <div className="absolute formContainer hidden top-0 left-0 w-screen h-screen backdrop-blur">
        <TodoForm handleFormView={handleAddForm} />
      </div>
    </Container>
  );
}

export default App;
