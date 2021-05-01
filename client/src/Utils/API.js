
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

        axios.post( `${process.env.REACT_APP_FIREBASE_REST_API}/seanthenkyle/curQueueArr.json`, { id: ID(), value } ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    removeFromQueueAPI: ( value ) =>
    {
        axios.delete( `${process.env.REACT_APP_FIREBASE_REST_API}/seanthenkyle/curQueueArr/${value}.json` ).then( ( response ) =>
        {
            console.log( ' removeFromQUeueAPI', response )
        } )
    }
    ,
    checkIfUserExists: ( value ) =>
    {

        axios.get( `${process.env.REACT_APP_FIREBASE_REST_API}/users/.json?orderBy="email"&startAt="${value}"` ).then( ( response ) =>
        {
            console.log( 'response.data', Object.keys( response.data ).length > 0, response )
            return response.data
        } )
    },
    createNewUser: ( value ) =>
    {
        axios.get( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}.json` ).then( ( response ) =>
        {
            const snap = response.data
            console.log( 'createNewUser', response )
            if ( snap )
            {

                return console.log( 'user already exists', response )


            } else
            {
                console.log( 'user does not exist', response )
                axios.post( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}.json`, { value } ).then( ( response ) =>
                {
                    return console.log( 'user created', response.data )
                } )
            }




        } )
    },
    checkIfUserLinkedToStore: ( value ) =>
    {
        return axios.get( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}/store.json` )


    },
    setStore: async ( value ) =>
    {
        const { store } = value
        return axios.post( `${process.env.REACT_APP_FIREBASE_REST_API}/users/${value.uid}/store.json`, { store } )

    }
}
export default API