import React, { useState, useContext } from "react";
import { ListItem, ListItemText, Button, ButtonGroup } from "@material-ui/core";
// import { WaitingQueueContext } from '../../Context/WaitingQueueContext';
import { ApprovedQueueContext } from "../../Context/ApprovedQueueContext";

const ApprovedQueueItem = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  // const { curWaitingQueueState, setCurWaitingQueueState } = useContext(WaitingQueueContext)
  const { curApprovedQueueState, setCurApprovedQueueState } = useContext(
    ApprovedQueueContext
  );

  const handleSlideOpen = (event) => {
    setAnchorEl(true);
    console.log("handleSlideOpen");
  };

  const handleSlideClose = () => {
    setAnchorEl(false);
    console.log("handleSlideClose");
  };

  const handleRemove = (element) => {
    return () => {
      let newArr = curApprovedQueueState.curQueueArr.filter(
        (el) => el !== element
      );
      setCurApprovedQueueState({ curQueueArr: newArr });
      console.log("handleRemove", newArr);
    };
  };

  const handleMoveUp = (element) => {
    return () => {
      console.log(`moving up ${element}`);
    };
  };
  const handleMoveDown = (element) => {
    return () => {
      console.log(`moving down ${element}`);
    };
  };

  const { id, value } = props.element;
  const listItemId = id;
  return (
    <ListItem
      id={listItemId}
      onMouseEnter={handleSlideOpen}
      onMouseLeave={handleSlideClose}
    >
      <ListItemText primary={value}>{value}</ListItemText>
      {anchorEl && (
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
        >
          <Button onClick={handleMoveUp(props.element)}>Move Up</Button>
          <Button onClick={handleMoveDown(props.element)}>Move Down</Button>
          <Button onClick={handleRemove(props.element)}>Remove</Button>
        </ButtonGroup>
      )}
    </ListItem>
  );
};

export { ApprovedQueueItem };
