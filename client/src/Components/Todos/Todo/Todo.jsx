import React from "react";
import {
  ListItem,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const Todo = props => {
  return (
    <ListItem
      onClick={props.clicked}
      button
      style={{ margin: "auto", cursor: "pointer" , overflowX:'scroll'}}
    >
      <Checkbox color="primary" checked={props.todo.complete} />
      <ListItemText style={{zIndex:'20'}}>{props.todo.text}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={props.removed} style={{zIndex:'30',backgroundColor:'#fff'}}>
          <CloseIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
