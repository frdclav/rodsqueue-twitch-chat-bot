import React, { useEffect } from "react";
import { List, Grid } from "@material-ui/core";

import { QueueItem } from "../QueueItem";

const Queue = ( props ) =>
{
  const theDbValue = props.dbValue ? props.dbValue.curQueueArr : null;
  useEffect( () =>
  {
    console.log( "Queue props updating", props )

  }, [ props ] )
  const ifNoItemsInQueue = () =>
  {
    return (
      <p> queue is empty.</p>
    )
  }
  const ifItemsInQueue = () =>
  {
    return (
      <List>
        <Grid style={{ padding: '10px' }} container direction="column">
          {Object.keys( theDbValue ).map( ( key, index ) =>

          (
            <QueueItem element={{ ...theDbValue[ key ], key }} isPublic={props.isPublic} />
          )

          )}
        </Grid>
      </List>
    )
  }

  return (
    theDbValue ? ifItemsInQueue() : ifNoItemsInQueue()
  );
};

export { Queue };

