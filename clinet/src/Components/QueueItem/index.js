import React, { useState, useContext } from 'react';
import { ListItem, ListItemText, Button, ButtonGroup } from '@material-ui/core';
import { WaitingQueueContext } from '../../Context/WaitingQueueContext';

const QueueItem = (props) => {
    const [anchorEl, setAnchorEl] = useState(false)
    const { curWaitingQueueState, setCurWaitingQueueState } = useContext(WaitingQueueContext)
    const handleSlideOpen = (event) => {
        setAnchorEl(true);
        console.log('handleSlideOpen')
    };

    const handleSlideClose = () => {
        setAnchorEl(false);
        console.log('handleSlideClose')
    };

    const handleRemove = element => {

        return () => {
            let newArr = curWaitingQueueState.curQueueArr.filter(el => el !== element)
            setCurWaitingQueueState({curQueueArr:newArr})
            console.log('handleRemove', newArr)
        }

    }


    const { id, value } = props.element
    const listItemId = id
    return (
        <ListItem id={listItemId} onMouseEnter={handleSlideOpen}
            onMouseLeave={handleSlideClose}>
            <ListItemText primary={value}>{value}</ListItemText>
            {anchorEl && (<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button>Move Up</Button>
                <Button>Move Down</Button>
                <Button onClick={handleRemove(props.element)}>Remove</Button>
            </ButtonGroup>)
}


        </ListItem >

    )



};

export { QueueItem };