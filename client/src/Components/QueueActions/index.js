import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { QueueSwitch } from "../QueueSwitch";
import { ClearQueueButton } from "../ClearQueueButton"
import API from "../../Utils/API"

const QueueActions = ( props ) =>
{
    const [ anchorEl, setAnchorEl ] = useState( null )
    const handleClick = ( event ) =>
    {
        setAnchorEl( event.currentTarget )
    }
    const handleClose = () =>
    {
        // console.log( 'menu should close now', anchorEl )
        setAnchorEl( null )
        // console.log( anchorEl )
    }
    const handleClearQueue = () =>
    {

        // console.log( 'clearqueue!', props.curShop )
        API.clearQueue( { storename: props.curShop, value: [] } )
        handleClose()

    }
    useEffect( () =>
    {
        console.log( 'cur AnchorEl', anchorEl )
    }, [ anchorEl ] )
    return (
        <React.Fragment>
            <IconButton aria-label="queue-options" onClick={handleClick}>
                <MoreVertIcon />

            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean( anchorEl )}
                onClose={handleClose}
            >
                <MenuItem >
                    <QueueSwitch curShop={props.curShop} onClick={handleClose}></QueueSwitch>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ClearQueueButton handleClearQueue={handleClearQueue} curShop={props.curShop}></ClearQueueButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </React.Fragment >
    )

};





export { QueueActions };
