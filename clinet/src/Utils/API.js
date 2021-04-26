import axios from 'axios';
const ID = function ()
{
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return "_" + Math.random().toString( 36 ).substr( 2, 9 );
};

export default {

    addToQueueAPI: ( value ) =>
    {

        axios.post( 'https://rodsqueue-default-rtdb.firebaseio.com/curQueueArr.json', { id: ID(), value } ).then( ( response ) =>
        {
            console.log( response )
        } )


    },

    removeFromQueueAPI: ( value ) =>
    {
        axios.delete( `https://rodsqueue-default-rtdb.firebaseio.com/curQueueArr/${value}.json` ).then( ( response ) =>
        {
            console.log( ' removeFromQUeueAPI', response )
        } )
    }
}
