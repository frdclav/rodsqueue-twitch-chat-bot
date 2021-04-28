import React, { useContext } from "react";
import { List, Paper, Grid } from "@material-ui/core";
import { WaitingQueueContext } from "../../Context/WaitingQueueContext";

import { QueueItem } from "../QueueItem";

const Queue = ( props ) =>
{
  const { curWaitingQueueState } = useContext( WaitingQueueContext );
  const theDbValue = props.dbValue ? props.dbValue.curQueueArr : curWaitingQueueState;

  return (
    <List>
      <Grid style={{ padding: '10px' }} container direction="column">
        {/* {curWaitingQueueState.curQueueArr.map(item => ( */}
        {/* {theDbValue.curQueueArr.map((item) => ( */}
        {Object.keys( theDbValue ).map( ( key, index ) =>

        (
          <QueueItem element={{ ...theDbValue[ key ], key }} isPublic={props.isPublic} />
        )

        )}
      </Grid>
    </List>
  );
};

export { Queue };

// () => {
//   return (
//     <ListItem >
//       <ListItemText primary="Item1"></ListItemText>
//     </ListItem>)
// }, () => {
//   return (<ListItem >
//     <ListItemText primary="Item2"></ListItemText>
//   </ListItem>)
// }]
