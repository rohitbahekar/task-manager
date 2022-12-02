const todosKey = "todos";

export const getTodos = () => {
  let todosArray;
  try {
    const savedTodosString = localStorage.getItem(todosKey);
    todosArray = savedTodosString ? JSON.parse(savedTodosString) : [];
  } catch (error) {
    todosArray = [];
  }
  return todosArray;
};

export const setTodos = (todos) => {
  const todoString = JSON.stringify(todos);
  localStorage.setItem(todosKey, todoString);
};

export const prioritiesList = [
  {
    label: "Low",
    color: "lightblue",
  },
  {
    label: "Medium",
    color: "yellow",
  },
  {
    label: "High",
    color: "orange",
  },
];

export const blankTodo = () => {
  return {
    title: "",
    subTitle: "",
    notes: "",
    priority: "Low",
    subTasks: [],
    status: "Todo",
  };
};

export const statusList = ["Todo", "In progress", "Done"];

export const doneStatus = "Done";

export const priorityColor = prioritiesList.reduce((acc, priority) => {
  acc[priority.label] = priority.color;
  return acc;
}, {});
