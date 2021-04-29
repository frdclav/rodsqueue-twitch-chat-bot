import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
// import logo from './logo.svg';
import "./App.css";
import { AddToQueueInput } from "./Components/AddToQueueInput";
import { Queue } from "./Components/Queue";
import { ApprovedQueue } from "./Components/ApprovedQueue";
import { WaitingQueueContext } from "./Context/WaitingQueueContext";
import { ApprovedQueueContext } from "./Context/ApprovedQueueContext";
import { AddToQueueInputContext } from "./Context/AddToQueueInputContext";
import { UnAuthed } from "./Components/UnAuthed"
import
{
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
} from "@react-firebase/database";
import firebase from "firebase";
import "firebase/auth"
import
{
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FirebaseAuthConsumer, FirebaseAuthProvider } from "@react-firebase/auth"
const App = ( props ) =>
{
  const [ curWaitingQueueState, setCurWaitingQueueState ] = useState( {
    curQueueArr: [
      { id: "_piaefnpiae23048", value: "Item1" },
      { id: "_apeine93f04bnf08", value: "Item2" },
    ],
  } );
  const [ curApprovedQueueState, setCurApprovedQueueState ] = useState( {
    curQueueArr: [
      { id: "_piaefneafeafpiae23048", value: "Item1" },
      { id: "_apeine93faefeaf04bnf08", value: "Item2" },
    ],
  } );
  const [ curAddToQueueInputState, setCurAddToQueueInputState ] = useState( {
    in: "",
  } )
  const firebaseConfig = {
    apiKey: "AIzaSyAw0Gq2dugz4l6GaNSzISAfQ7c5l57TAKw",
    authDomain: "rodsqueue.firebaseapp.com",
    projectId: "rodsqueue",
    storageBucket: "rodsqueue.appspot.com",
    messagingSenderId: "1023284396545",
    appId: "1:1023284396545:web:54852affa9b225aca27600",
  };
  // firebase.initializeApp( firebaseConfig )
  // const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithPopup( googleAuthProvider );
  const IfUnAuthed = () =>
  {
    return (
      <UnAuthed firebase={firebase} ></UnAuthed>
    );
  };
  const curShop = 'seanthenkyle'
  const IfAuthed = () =>
  {
    return (
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseNode path={`/${curShop}`}>
          {( d ) =>
          {
            // console.log( 'd', d.value )
            return (


              <WaitingQueueContext.Provider
                value={{ curWaitingQueueState, setCurWaitingQueueState }}
              >
                <AddToQueueInputContext.Provider
                  value={{
                    curAddToQueueInputState,
                    setCurAddToQueueInputState,
                  }}
                >
                  <Grid style={{ padding: '100px' }} container direction="column" justify="space-around" alignItems="center" spacing={4}>
                    <Grid item>
                      {/* <ApprovedQueue /> */}
                      <AddToQueueInput dbValue={d.value ? d.value : `NULL`} />


                    </Grid>
                    <Grid item>
                      <Queue dbValue={d.value} />
                    </Grid>
                    <Grid item>
                      <Button color="primary" onClick={() => { firebase.auth().signOut() }}>SIGN OUT!</Button>
                    </Grid>
                    <Grid item>
                      <Link to="/public">PUBLIC VIEW</Link>
                    </Grid>
                  </Grid>
                  {/* <Grid container justify="space-around" alignItems="center" spacing={4}>
                          <Grid item><pre>Path {d.path}</pre></Grid>
                          <Grid item><pre style={{ height: 300, overflow: "auto" }}>
                            Value {d.value ? JSON.stringify( d.value.curQueueArr, null, 1 ) : `null`}
                          </pre></Grid>
        
                        </Grid> */}

                </AddToQueueInputContext.Provider>
              </WaitingQueueContext.Provider>

            );
          }
          }
        </FirebaseDatabaseNode>
      </FirebaseDatabaseProvider >
    )
  }

  const Main = () =>
  {
    return ( <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>

      <FirebaseAuthConsumer>
        {( { isSignedIn, user, providerId } ) =>
        {
          if ( !isSignedIn )
          {
            return IfUnAuthed();

          } else
          {
            return IfAuthed();
          }
        }}

      </FirebaseAuthConsumer>

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


    </FirebaseAuthProvider> )
  }

  const Public = () =>
  {
    return (
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseNode path={`/${curShop}`}>
          {( d ) =>
          {
            console.log( 'd', d.value )
            return (


              <WaitingQueueContext.Provider
                value={{ curWaitingQueueState, setCurWaitingQueueState }}
              >


                <Queue dbValue={d.value} display="" isPublic={true} />
                {/* <Grid container justify="space-around" alignItems="center" spacing={4}>
                          <Grid item><pre>Path {d.path}</pre></Grid>
                          <Grid item><pre style={{ height: 300, overflow: "auto" }}>
                            Value {d.value ? JSON.stringify( d.value.curQueueArr, null, 1 ) : `null`}
                          </pre></Grid>
        
                        </Grid> */}

              </WaitingQueueContext.Provider>

            );
          }
          }
        </FirebaseDatabaseNode>
      </FirebaseDatabaseProvider >
    )
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/public">
          <Public />
        </Route>

      </Switch>


    </Router>

  );

  // return [
  //   <QueueContext.Provider value={{ curQueueState, setCurQueueState }} />,
  //   <Box className="App-header" />,
  //   <AddToQueueInput />,
  //   <Queue />
  // ]
};

export default App;
