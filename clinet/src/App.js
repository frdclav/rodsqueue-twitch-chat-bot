import React, { useState } from "react";
import { Grid } from "@material-ui/core";
// import logo from './logo.svg';
import "./App.css";
import { AddToQueueInput } from "./Components/AddToQueueInput";
import { Queue } from "./Components/Queue";
import { ApprovedQueue } from "./Components/ApprovedQueue";
import { WaitingQueueContext } from "./Context/WaitingQueueContext";
import { ApprovedQueueContext } from "./Context/ApprovedQueueContext";
import { AddToQueueInputContext } from "./Context/AddToQueueInputContext";
import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
} from "@react-firebase/database";
import firebase from "firebase";
const App = (props) => {
  const [curWaitingQueueState, setCurWaitingQueueState] = useState({
    curQueueArr: [
      { id: "_piaefnpiae23048", value: "Item1" },
      { id: "_apeine93f04bnf08", value: "Item2" },
    ],
  });
  const [curApprovedQueueState, setCurApprovedQueueState] = useState({
    curQueueArr: [
      { id: "_piaefneafeafpiae23048", value: "Item1" },
      { id: "_apeine93faefeaf04bnf08", value: "Item2" },
    ],
  });
  const [curAddToQueueInputState, setCurAddToQueueInputState] = useState({
    in: "",
  });
  const firebaseConfig = {
    apiKey: "AIzaSyAw0Gq2dugz4l6GaNSzISAfQ7c5l57TAKw",
    authDomain: "rodsqueue.firebaseapp.com",
    projectId: "rodsqueue",
    storageBucket: "rodsqueue.appspot.com",
    messagingSenderId: "1023284396545",
    appId: "1:1023284396545:web:54852affa9b225aca27600",
  };
  return (
    <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
      <FirebaseDatabaseNode path="/">
        {/* {(d) => {
          return (
            <React.Fragment>
              <pre>Path {d.path}</pre>
              <pre style={{ height: 300, overflow: "auto" }}>
                Value {JSON.stringify(d.value)}
              </pre>
              <button
                onClick={() => {
                  this.setState((state) => ({ limit: state.limit + 2 }));
                }}
              >
                Load more
              </button>
            </React.Fragment>
          );
        }} */}
        {(d) => {
          return (
            // <React.fragment>
            <ApprovedQueueContext.Provider
              value={{ curApprovedQueueState, setCurApprovedQueueState }}
            >
              <WaitingQueueContext.Provider
                value={{ curWaitingQueueState, setCurWaitingQueueState }}
              >
                <AddToQueueInputContext.Provider
                  value={{
                    curAddToQueueInputState,
                    setCurAddToQueueInputState,
                  }}
                >
                  <div>
                    <pre>Path {d.path}</pre>
                    <pre style={{ height: 300, overflow: "auto" }}>
                      Value {JSON.stringify(d.value)}
                    </pre>
                    <AddToQueueInput dbValue={d.value} />
                    <Grid container spacing={2}>
                      <Grid item>
                        <Queue dbValue={d.value} />
                      </Grid>
                      <Grid item>
                        <ApprovedQueue />
                      </Grid>
                    </Grid>
                  </div>
                </AddToQueueInputContext.Provider>
              </WaitingQueueContext.Provider>
            </ApprovedQueueContext.Provider>
            // </React.fragment>
          );
        }}
      </FirebaseDatabaseNode>
    </FirebaseDatabaseProvider>
  );

  // return [
  //   <QueueContext.Provider value={{ curQueueState, setCurQueueState }} />,
  //   <Box className="App-header" />,
  //   <AddToQueueInput />,
  //   <Queue />
  // ]
};

export default App;
