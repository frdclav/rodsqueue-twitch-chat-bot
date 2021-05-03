
import axios from 'axios';
const ID = function ()
{
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};

const API = {

    addToQueueAPI: ( value ) =>
    {
        console.log( 'addtoqueue', value )
        axios.get( `/firebaseAPI/addtoqueueapi/${value}` ).then( ( response ) =>
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