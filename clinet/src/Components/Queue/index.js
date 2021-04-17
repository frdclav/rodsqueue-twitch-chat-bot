import React, { useContext } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { QueueContext } from '../../Context/QueueContext'

const Queue = (props) => {
    const { curQueueState } = useContext(QueueContext)




    return (

        <List>


            {curQueueState.curQueueArr.map(element => (
                 <ListItem >
                        <ListItemText primary={element}>{element}</ListItemText>
                      </ListItem>
    ))}

        </List>
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