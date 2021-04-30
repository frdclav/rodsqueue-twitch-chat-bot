import React, { useState } from "react";
import "./App.css";
import { Queue } from "./Components/Queue";
import { WaitingQueueContext } from "./Context/WaitingQueueContext";
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
  useParams
} from "react-router-dom";
import { FirebaseAuthConsumer, FirebaseAuthProvider } from "@react-firebase/auth"
import { SiteHeader } from "./Components/SiteHeader"
import { LinkCheck } from "./Components/LinkCheck";
const App = ( props ) =>
{
  const [ curWaitingQueueState, setCurWaitingQueueState ] = useState( {
    curQueueArr: [
      { id: "_piaefnpiae23048", value: "Item1" },
      { id: "_apeine93f04bnf08", value: "Item2" },
    ],
  } );



  const firebaseConfig = {
    apiKey: "AIzaSyAw0Gq2dugz4l6GaNSzISAfQ7c5l57TAKw",
    authDomain: "rodsqueue.firebaseapp.com",
    projectId: "rodsqueue",
    storageBucket: "rodsqueue.appspot.com",
    messagingSenderId: "1023284396545",
    appId: "1:1023284396545:web:54852affa9b225aca27600",
  };


  // const curShop = 'seanthenkyle'


  const Main = () =>
  {
    return (
      <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>

        <FirebaseAuthConsumer>
          {( { isSignedIn, user, providerId } ) =>
          {
            if ( !isSignedIn )
            {
              console.log( 'unauthed' )
              return <UnAuthed firebase={firebase} ></UnAuthed>


            } else
            {
              console.log( 'authed', user )
              return <LinkCheck user={user} firebase={firebase} firebaseConfig={firebaseConfig}></LinkCheck>

              // const curShop = 'seanthenkyle'
              // return <Authed firebase={firebase} firebaseConfig={firebaseConfig} curShop={curShop}> </Authed>


              // API.checkIfUserLinkedToStore( user ).then( response =>
              // {
              //   console.log( response.data )
              //   const curShop = response.data

              //   if ( curShop )
              //   {
              //     console.log( 'linked', curShop )
              //     return ( <Authed firebase={firebase} firebaseConfig={firebaseConfig} curShop={curShop}> </Authed> )
              //   } else
              //   {
              //     console.log( 'not linked', curShop )

              //     // return <AuthedNotLinked></AuthedNotLinked>
              //     return () => { <p>notlinked</p> }
              //   }


              // } )



            }
          }}

        </FirebaseAuthConsumer>



      </FirebaseAuthProvider>
    )
  }

  const Public = () =>
  {
    let { storeName } = useParams();
    return (
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <FirebaseDatabaseNode path={`/${storeName}`}>
          {( d ) =>
          {
            console.log( 'd', d.value )
            return (


              <WaitingQueueContext.Provider
                value={{ curWaitingQueueState, setCurWaitingQueueState }}
              >


                <Queue dbValue={d.value} display="" isPublic={true} />

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
          <SiteHeader />

          <Main />
        </Route>
        <Route path="/main">
          <SiteHeader />

          <Main />
        </Route>
        <Route path="/public/:storeName" children={<Public />}>

        </Route>

      </Switch>


    </Router>

  );

};

export default App;
