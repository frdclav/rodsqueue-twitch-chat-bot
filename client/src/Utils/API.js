
import axios from 'axios';


const API = {

    clearQueue: ( value ) =>
    {
        console.log( 'clearqueu', value )
        axios.post( `/firebaseAPI/addtoqueueapi`, [] ).then( ( response ) =>
        {
            console.log( response )
        } )

    },
    addToQueueAPI: ( value ) =>
    {
        console.log( 'addtoqueue', value )
        axios.post( `/firebaseAPI/addtoqueueapi`, value ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    removeFromQueueAPI: ( value ) =>
    {
        axios.delete( `/firebaseAPI/removefromqueueapi/${value}` ).then( ( response ) =>
        {
            console.log( ' removeFromQUeueAPI', response )
        } )
    }
    ,
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


    },
    setStore: async ( value ) =>
    {
        return axios.post( `/firebaseAPI/store`, value )

    }
}
export default API