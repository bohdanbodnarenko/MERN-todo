import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import Todos from "./Components/Todos/Todos";
import TodoForm from "./Components/Todos/TodoForm/TodoForm";

export const TodosQuery = gql`
  {
    todos {
      id
      text
      complete
    }
  }
`;

const UpdateMutation = gql`
  mutation($id: ID!, $complete: Boolean!) {
    updateTodo(id: $id, complete: $complete)
  }
`;

const RemoveMutation = gql`
  mutation($id: ID!) {
    removeTodo(id: $id)
  }
`;

const CreateMutation = gql`
  mutation($text: String!) {
    createTodo(text: $text) {
      id
      text
      complete
    }
  }
`;

class App extends Component {
  createTodo = async text => {
    console.log(this.props.newTodo);
    await this.props.createTodo({
      variables: {
        text
      },
      update: (store, { data: { createTodo } }) => {
        const data = store.readQuery({ query: TodosQuery });
        data.todos.unshift(createTodo);
        store.writeQuery({ query: TodosQuery, data });
      }
    });
  };

  render() {
    console.log(this.props);
    const {
      data: { loading, todos }
    } = this.props;
    if (loading) {
      return <p>loading...</p>;
    }
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <TodoForm submit={this.createTodo} />
        <Todos
          removeTodo={this.props.removeTodo}
          updateTodo={this.props.updateTodo}
          todos={todos}
        />
      </div>
    );
  }
}

export default compose(
  graphql(UpdateMutation, { name: "updateTodo" }),
  graphql(RemoveMutation, { name: "removeTodo" }),
  graphql(CreateMutation, { name: "createTodo" }),
  graphql(TodosQuery)
)(App);
