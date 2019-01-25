import React from "react";
import List from "@material-ui/core/List";
import Todo from "./Todo/Todo";
import Card from "@material-ui/core/Card";
import { TodosQuery } from "../../App";

const Todos = props => {
  const updateTodo = todo => async _ => {
    await props.updateTodo({
      variables: {
        id: todo.id,
        complete: !todo.complete
      },
      update: store => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos.forEach(el => {
          if (el.id === todo.id) {
            el.complete = !el.complete;
          }
        });
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  const removeTodo = todo => async _ => {
    await props.removeTodo({
      variables: {
        id: todo.id
      },
      update: store => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos = data.todos.filter(el => el.id !== todo.id);
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  return (
    <div style={{ margin: "5vh auto" }}>
      <Card>
        <List style={{maxWidth:'80vw'}}>
          {props.todos.map(todo => (
            <Todo
              removed={removeTodo(todo)}
              clicked={updateTodo(todo)}
              key={todo.id}
              todo={todo}
            />
          ))}
        </List>
      </Card>
    </div>
  );
};

export default Todos;
