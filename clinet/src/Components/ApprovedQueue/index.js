import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { ApprovedQueueContext } from '../../Context/ApprovedQueueContext'

const ApprovedQueue = (props) => {
    const { curApprovedQueueState } = useContext(ApprovedQueueContext)




    return (
        <Paper> <List>


            {curApprovedQueueState.curQueueArr.map(element => (
                <ListItem >
                    <ListItemText primary={element}>{element}</ListItemText>
                </ListItem>
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