import React from "react";
import { List, Grid } from "@material-ui/core";

import { QueueItem } from "../QueueItem";
const ID = function ()
{
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};
const Queue = ( props ) =>
{
  const theDbValue = props.dbValue.curQueueArr ? props.dbValue.curQueueArr : null;
  // useEffect( () =>
  // {
  //   console.log( "Queue props updating", props )

  // }, [ props ] )
  const ifNoItemsInQueue = () =>
  {
    return (
      <p> queue is empty.</p>
    )
  }
  const ifItemsInQueue = () =>
  {
    return (
      <List style={{ width: '100vw', height: '100vh', overflow: 'none' }}>
        <Grid style={{ padding: '10px' }} container direction="column" alightItems="stretch">
          {/* {theDbValue} */}
          {theDbValue.map( ( el ) =>
          {
            const itemKey = ID()
            // console.log( 'el', el )
            // return (
            //   <ListItem ><p>{`${el}`}</p></ListItem>
            // )
            return (
              <QueueItem id={itemKey} element={el} isPublic={props.isPublic} key={itemKey} curQueue={props.dbValue} curShop={props.curShop} />
            )

          } )}
          {/* {Object.keys( theDbValue ).map( ( key, index ) =>
          {

            const itemKey = ID()
            return (
              <QueueItem element={{ ...theDbValue[ key ], key }} isPublic={props.isPublic} key={itemKey} />
            )

          }

          )} */}
        </Grid>
      </List>
    )
  }

  return (
    theDbValue ? ifItemsInQueue() : ifNoItemsInQueue()
  );
};

export { Queue };

