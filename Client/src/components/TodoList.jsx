import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { TextField, Select, MenuItem } from "@mui/material";
import ApiService from "../service/api.js";
import { useEffect,useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../service/api.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TodoList() {
  const { register, handleSubmit, control } = useForm();

  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", ApiService.getTodosList);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "todos",
  });

  function onsubmit(data, index) {
    toast.success("Task Updated");
    updateTodoMutation.mutate(data.todos[index]);
  }

  const updateTodoMutation = useMutation(api.updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const deleteTodoMutation = useMutation(api.deleteTodo, {
    onSuccess: () => {
      toast.success("Task Deleted");
      queryClient.invalidateQueries("todos");
    },
  });

  const compeleteTodoMutation = useMutation(api.completeTask, {
    onSuccess: () => {
      toast.success("Task Status Changed");
      queryClient.invalidateQueries("todos");
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.log("error is ", error);
    return;
  }

  return (
    <div className="flex flex-col gap-5">
      {/* <ToastContainer theme="dark" autoClose={2000} /> */}
      {todos.map((todo, index) => (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={todo._id}
        >
          <Checkbox
            checked={todo.isCompleted}
            inputProps={{ "aria-label": "controlled" }}
            onChange={() => compeleteTodoMutation.mutate(todo._id)}
          />
          <form
            onSubmit={handleSubmit((data) => {
              onsubmit(data, index);
            })}
          >
            <Accordion sx={{ width: 500 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                {/* Accordion Actions */}
                <TextField
                  fullWidth
                  sx={{ outline: "none" }}
                  id="title"
                  name="title"
                  defaultValue={todo.title}
                  {...register(`todos.${index}.title`)}
                />

                <TextField
                  fullWidth
                  sx={{ outline: "none", display: "none" }}
                  id="id"
                  name="id"
                  // className="hidden"
                  defaultValue={todo._id}
                  {...register(`todos.${index}._id`)}
                />
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  fullWidth
                  sx={{ outline: "none" }}
                  id="desc"
                  name="desc"
                  defaultValue={todo.desc}
                  {...register(`todos.${index}.desc`)}
                />

                <Select
                  labelId="label"
                  name="priority"
                  defaultValue={todo.priority}
                  {...register(`todos.${index}.priority`)}
                 
                >
                  <MenuItem value={"HIGH"}>High</MenuItem>
                  <MenuItem value={"MID"}>Mid</MenuItem>
                  <MenuItem value={"LOW"}>Low</MenuItem>
                </Select>
              </AccordionDetails>
              <AccordionActions>
                <Button type="submit" color="success" variant="contained">
                  Save Update
                </Button>
                <Button
                  onClick={() => deleteTodoMutation.mutate(todo._id)}
                  color="error"
                  variant="outlined"
                >
                  Delete
                </Button>
              </AccordionActions>
            </Accordion>
          </form>
        </Container>
      ))}
    </div>
  );
}
