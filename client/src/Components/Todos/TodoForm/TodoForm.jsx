import React, { Component } from "react";
import { TextField } from "@material-ui/core";

class TodoForm extends Component {
  state = {
    newTodo: ""
  };

  changeState = event => {
    this.setState({ newTodo: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.submit(this.state.newTodo);
    this.setState({ newTodo: " " });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler} style={{margin:"auto"}}>
        <TextField
          value={this.state.newTodo}
          label="New todo..."
          margin="normal"
          onChange={this.changeState}
        />
      </form>
    );
  }
}

export default TodoForm;
