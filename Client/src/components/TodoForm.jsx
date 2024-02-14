import {
  Box,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoForm({ handleFormView }) {
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();
  function onSubmit(data) {
    if (Object.values(data).some((each) => each.trim() === "")) {
      toast.error('All Field is Required')
      return;
    }
    try {
      addTodoMutation.mutate(data);
    } catch (error) {
      toast.error(error.message)
    }
    // setValue('')
    handleFormView();
    setValue("title", "");
    setValue("desc", "");
    setValue("priority", "LOW");
  }

  const addTodoMutation = useMutation(api.addTodo, {
    onSuccess: () => {
      toast.success('Task Added')
      queryClient.invalidateQueries("todos");
    },
    onError:(error)=>{
      toast.error(error.message || 'An error occurred');
    }
  });
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 3,
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          height: "100vh",
        }}
        maxWidth="sm"
      >
        {/* <ToastContainer theme="dark" autoClose={2000} /> */}

        <Box width={500}>
          <form className="flex flex-col w-full gap-3">
            <TextField label="Title" color="primary" {...register("title")} />
            <TextField
              label="Description"
              color="primary"
              {...register("desc")}
            />

            <FormControl>
              <InputLabel id="demo-select-label">Priority</InputLabel>
              <Select
                labelId="demo-select-label"
                id="demo-select-small"
                label="priority"
                name="priority"
                {...register("priority")}
                defaultValue={"LOW"}
              >
                <MenuItem value={"HIGH"}>High</MenuItem>
                <MenuItem value={"MID"}>Mid</MenuItem>
                <MenuItem value={"LOW"}>Low</MenuItem>
              </Select>
            </FormControl>

            <Box className="flex justify-between gap-2">
              <Button
                className="w-1/2"
                color="success"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Add Todo
              </Button>
              <Button
                onClick={handleFormView}
                className="w-1/2"
                color="warning"
                variant="contained"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
