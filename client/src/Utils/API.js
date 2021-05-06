
import axios from 'axios';
import bcrypt from 'bcryptjs';


const API = {

    setStore: ( value ) =>
    {
        console.log( `set store ${JSON.stringify( value )}` )
        return axios.post( `/firebaseAPI/setstore`, value )

    }, createStore: ( value ) =>
    {
        console.log( `creating store ${JSON.stringify( value )}` )
        return axios.post( `/firebaseAPI/createstore`, value )

    },
    checkStore: ( value ) =>
    {
        console.log( `checking store ${JSON.stringify( value )}` )
        return axios.post( `/firebaseAPI/checkstore`, value )
    },
    checkStorePw: ( value ) =>
    {
        console.log( `checking store wit pw ${JSON.stringify( value )}` )

    }
    ,
    queueStatus: ( value ) =>
    {
        // console.log( 'checkingStatus' )
        return axios.get( `/firebaseAPI/queuestatus/${value}` )
    },

    setQueueStatus: ( value ) =>
    {
        // console.log( 'settingStatus', value )
        return axios.post( `/firebaseAPI/setqueuestatus/${value.curShop}`, value )
    },

    clearQueue: ( value ) =>
    {
        // console.log( 'clearqueu', value )
        axios.post( `/firebaseAPI/addtoqueueapi`, value ).then( ( response ) =>
        {
            // console.log( response )
        } )

    },
    addToQueueAPI: ( value ) =>
    {
        // console.log( 'addtoqueue', value )
        axios.post( `/firebaseAPI/addtoqueueapi`, value ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    // removeFromQueueAPI: ( value ) =>
    // {
    //     axios.delete( `/firebaseAPI/removefromqueueapi/${value}` ).then( ( response ) =>
    //     {
    //         // console.log( ' removeFromQUeueAPI', response )
    //     } )
    // }

    checkIfUserExists: ( value ) =>
    {

        axios.post( `/firebaseAPI/checkifuseresists`, value ).then( ( response ) =>
        {
            // console.log( 'response.data', Object.keys( response.data ).length > 0, response )
            return response.data
        } )
    },
    createNewUser: ( value ) =>
    {
        axios.post( `/firebaseAPI/createnewuser`, value ).then( ( response ) =>
        {
            return console.log( 'createnewuser', response )

        } )
    },
    checkIfUserLinkedToStore: ( value ) =>
    {
        // console.log( 'checking', value )
        return axios.post( `/firebaseAPI/checkifuserlinkedtostore`, value )


    }
}
export default API