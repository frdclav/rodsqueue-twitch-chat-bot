import React, { Component, useState } from 'react';
import { ListItem, ListItemText } from '@material-ui/core'
// import logo from './logo.svg';
import './App.css';
import { AddToQueueInput } from './Components/AddToQueueInput';
import { Queue } from './Components/Queue'
import { QueueContext } from './Context/QueueContext'


const App = () => {
  const [curQueueState, setCurQueueState] = useState({
    curQueueArr: ['Item1','Item2']
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
  })


  return (
    <QueueContext.Provider value={{ curQueueState, setCurQueueState }}>

      <div>
        <AddToQueueInput />
        <Queue />
      </div>
    </QueueContext.Provider>
  )





  // return [
  //   <QueueContext.Provider value={{ curQueueState, setCurQueueState }} />,
  //   <Box className="App-header" />,
  //   <AddToQueueInput />,
  //   <Queue />
  // ]
}









export default App;
