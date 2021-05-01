import React, { useContext } from 'react';
import { List, Paper } from '@material-ui/core';
import { ApprovedQueueContext } from '../../Context/ApprovedQueueContext';

import { ApprovedQueueItem } from '../ApprovedQueueItem';

const ApprovedQueue = (props) => {
    const { curApprovedQueueState } = useContext(ApprovedQueueContext)




    return (
        <Paper> <List>


            {curApprovedQueueState.curQueueArr.map(item => (

                   <ApprovedQueueItem element={item}  />
                   
               

            ))}

        </List></Paper>

    )
};

export { ApprovedQueue };


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