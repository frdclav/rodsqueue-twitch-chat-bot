import { createChainedFunction } from '@material-ui/core';
import axios from 'axios';
import bcrypt from 'bcryptjs';
const ID = function ()
{
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};
const saltRounds = 10;
export default {

    addToQueueAPI: ( value ) =>
    {

        axios.post( 'https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle/curQueueArr.json', { id: ID(), value } ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    removeFromQueueAPI: ( value ) =>
    {
        axios.delete( `https://rodsqueue-default-rtdb.firebaseio.com/seanthenkyle/curQueueArr/${value}.json` ).then( ( response ) =>
        {
            console.log( ' removeFromQUeueAPI', response )
        } )
    }
    ,
    checkIfUserExists: ( value ) =>
    {

        axios.get( `https://rodsqueue-default-rtdb.firebaseio.com/users/.json?orderBy="email"&startAt="${value}"` ).then( ( response ) =>
        {
            console.log( 'response.data', Object.keys( response.data ).length > 0, response )
            return response.data
        } )
        // bcrypt.compare( "B4c0/\/", hash ).then( ( res ) =>
        // {
        //     // res === true
        // } );
    },
    // loginUser: ( value ) => { },
    createNewUser: ( value ) =>
    {
        // const { email, password } = value
        axios.get( `https://rodsqueue-default-rtdb.firebaseio.com/users/.json?orderBy="email"&startAt="${value.email}"` ).then( ( response ) =>
        {
            const snap = response.data

            if ( Object.keys( snap ).length > 0 )
            {
                for ( const [ key, objValue ] of Object.entries( snap ) )
                {
                    if ( objValue.email === value.email )
                    {
                        return console.log( 'user already exists', response )

                    }
                }

            }


            console.log( 'user does not exist', response )
            axios.post( 'https://rodsqueue-default-rtdb.firebaseio.com/users.json', { value } ).then( ( response ) =>
            {
                return console.log( 'user created', response.data )
            } )

        } )



    }
}
