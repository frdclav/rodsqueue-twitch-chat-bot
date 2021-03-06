import React, { useState, useEffect } from "react";
import { ListItem, ListItemText, Button, ButtonGroup, Grid, Box } from "@material-ui/core";
import API from "../../Utils/API"

const QueueItem = (props) => {

  let firebaseIdAuth
  props.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
    console.log(idToken, 'idToken')
    firebaseIdAuth = idToken
  }).catch(function (error) {
    // Handle error
    console.log('err with firebase auth', error)
  });

  const [anchorEl, setAnchorEl] = useState(false);
  const [curQueue, setCurQueue] = useState(props.curQueue.curQueueArr)

  // const curQueueContext = useContext( WaitingQueueContext );
  const moveInArray = (arr, from, to) => {
    // Make sure a valid array is provided
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw new Error('Please provide a valid array');
    }

    // Delete the item from it's current position
    var item = arr.splice(from, 1);

    // Make sure there's an item to move
    if (!item.length) {
      throw new Error('There is no item in the array at index ' + from);
    }

    // Move the item to its new position
    arr.splice(to, 0, item[0]);

  }
  useEffect(() => {
    // console.log( 'QueueItem curQueue', props.curQueue.curQueueArr )
    setCurQueue(props.curQueue)
  }, [props.curQueue, curQueue])

  // console.log( 'queueitem props', props )
  let handleRemove = (element) => {
    return () => {
      let newArr = curQueue.curQueueArr.filter(
        (el) => el !== element
      );
      // setCurWaitingQueueState( { curQueueArr: newArr } );
      // console.log( "handleRemove", newArr );

      // API.removeFromQueueAPI( element.key )
      API.addToQueueAPI({ storename: props.curShop, value: newArr, auth: firebaseIdAuth })

    };
  };


  let handleMoveUp = (element) => {
    return () => {
      // console.log( `moving up ${element}` );
      // console.log( 'curQueue', curQueue.curQueueArr )
      const newArr = curQueue.curQueueArr
      const curIndex = newArr.indexOf(element)
      // console.log( element, ' is in index', curIndex, newArr.length, ' is the lenght of newArr' )
      if (curIndex === 0) {
        return console.log('item is first item, doing nothing')
      } else {
        moveInArray(newArr, curIndex, curIndex - 1)
        // console.log( 'ok making move up', newArr )
        API.addToQueueAPI({ storename: props.curShop, value: newArr, auth: firebaseIdAuth })

      }
    };
  };
  let handleMoveDown = (element) => {
    return () => {
      // console.log( `moving down ${element}` );
      // console.log( 'curQueue', curQueue.curQueueArr )
      const newArr = curQueue.curQueueArr
      const curIndex = newArr.indexOf(element)
      // console.log( element, ' is in index', curIndex, newArr.length, ' is the lenght of newArr' )
      if (newArr.length === curIndex + 1) {
        return console.log('item is last item, doing nothing')
      } else {
        moveInArray(newArr, curIndex, curIndex + 1)
        // console.log( 'ok making move down', newArr )
        API.addToQueueAPI({ storename: props.curShop, value: newArr, auth: firebaseIdAuth })

      }
    };
  };
  const handleSlideOpen = (event) => {
    setAnchorEl(true);
    // console.log("handleSlideOpen");
  };

  const handleSlideClose = () => {
    setAnchorEl(false);
    // console.log("handleSlideClose");
  };



  // let { key, value } = props.element;
  // if ( typeof value === 'object' )
  // {
  //   console.log( 'value', JSON.stringify( value ) )
  //   value = 'something went wrong'
  //   console.log( value )
  // }
  // const listItemId = key;
  // console.log( 'queue item props', props )
  return (
    <Grid style={{ padding: '4px' }} item>
      <Box style={{ background: 'rgba( 255, 255, 255, 0.8 )' }} >
        <ListItem
          // id={listItemId}
          onMouseEnter={handleSlideOpen}
          onMouseLeave={handleSlideClose}
        >
          <Grid container direction='column'>
            <Grid item>
              <ListItemText primary={props.element.message} secondary={!props.isPublic && `order_id:${props.element.order_id ? props.element.order_id : 'none'}`} primaryTypographyProps={{ fontColor: '#000000', display: 'block', variant: `${props.isPublic ? 'h3' : 'p'}` }}>{props.element}</ListItemText>

            </Grid>
            <Grid >
              {!props.isPublic && anchorEl && (
                <React.Fragment>
                  <br />
                  <br />
                  <ButtonGroup
                    fullWidth={false}
                    color="primary"
                    size="small"
                    aria-label="text primary button group"
                  >
                    <Button onClick={handleMoveUp(props.element)}>move up</Button>
                    <Button onClick={handleMoveDown(props.element)}>move down</Button>
                    <Button onClick={handleRemove(props.element)}>delete</Button>
                  </ButtonGroup>
                </React.Fragment>

              )}
            </Grid>

          </Grid>

        </ListItem>
      </Box>
    </Grid>
  );
};

export { QueueItem };
