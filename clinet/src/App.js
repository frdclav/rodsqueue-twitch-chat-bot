import React, { useState } from 'react';
import { Grid } from '@material-ui/core'
// import logo from './logo.svg';
import './App.css';
import { AddToQueueInput } from './Components/AddToQueueInput';
import { Queue } from './Components/Queue'
import { ApprovedQueue } from './Components/ApprovedQueue'
import { WaitingQueueContext } from './Context/WaitingQueueContext'
import { ApprovedQueueContext } from './Context/ApprovedQueueContext'
import { AddToQueueInputContext } from './Context/AddToQueueInputContext';


const App = () => {
  const [curWaitingQueueState, setCurWaitingQueueState] = useState({
    curQueueArr: [{ id: '_piaefnpiae23048', value: 'Item1' }, { id: '_apeine93f04bnf08', value: 'Item2' }]

  })
  const [curApprovedQueueState, setCurApprovedQueueState] = useState({
    curQueueArr: ['Item1', 'Item2']

  })
  const [curAddToQueueInputState, setCurAddToQueueInputState] = useState('')


  return (
    <ApprovedQueueContext.Provider value={{ curApprovedQueueState, setCurApprovedQueueState }} >
      <WaitingQueueContext.Provider value={{ curWaitingQueueState, setCurWaitingQueueState }}>
        <AddToQueueInputContext.Provider value={{ curAddToQueueInputState, setCurAddToQueueInputState }}>

          <div>
            <AddToQueueInput />
            <Grid container spacing={2}>
              <Grid item>
                <Queue />

              </Grid>
              <Grid item>
                <ApprovedQueue />

              </Grid>
            </Grid>

          </div>
        </AddToQueueInputContext.Provider>

      </WaitingQueueContext.Provider>
    </ApprovedQueueContext.Provider>
  )





  // return [
  //   <QueueContext.Provider value={{ curQueueState, setCurQueueState }} />,
  //   <Box className="App-header" />,
  //   <AddToQueueInput />,
  //   <Queue />
  // ]
}









export default App;
