
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

        axios.post( `/addtoqueueapi`, { id: ID(), value } ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    removeFromQueueAPI: ( value ) =>
    {
        axios.post( `/removefromqueuapi`, value ).then( ( response ) =>
        {
            console.log( ' removeFromQUeueAPI', response )
        } )
    }
    ,
    checkIfUserExists: ( value ) =>
    {

        axios.post( `/checkifuseresists`, value ).then( ( response ) =>
        {
            // console.log( 'response.data', Object.keys( response.data ).length > 0, response )
            return response.data
        } )
    },
    createNewUser: ( value ) =>
    {
        axios.post( `/createnewuser`, value ).then( ( response ) =>
        {
            return console.log( 'createnewuser', response )

        } )
    },
    checkIfUserLinkedToStore: ( value ) =>
    {
        return axios.post( `/checkiflinkedtostore`, value )


    },
    setStore: async ( value ) =>
    {
        return axios.post( `/store`, value )

    }
}
export default API