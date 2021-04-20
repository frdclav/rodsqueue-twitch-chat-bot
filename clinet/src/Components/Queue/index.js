import React, { useContext } from 'react';
import { List, Paper } from '@material-ui/core';
import { WaitingQueueContext } from '../../Context/WaitingQueueContext';

import { QueueItem } from '../QueueItem';

const Queue = (props) => {
    const { curWaitingQueueState } = useContext(WaitingQueueContext)




    return (
        <Paper> <List>


            {curWaitingQueueState.curQueueArr.map(item => (

                   <QueueItem element={item}  />
                   
               

            ))}

        </List></Paper>

    )
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