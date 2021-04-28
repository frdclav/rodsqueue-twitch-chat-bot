// Import it in your project

const { generateFirebaseData } = require("generate-firebase-data");

// Import firebase-admin

const firebase = require("firebase-admin");

// Use it

(async () => {
  const databaseURL = "https://rodsqueue-default-rtdb.firebaseio.com/";
  const credential = require("../../rodsqueue-firebase-adminsdk-a4v34-a502178e09.json");
  const { schema, count, keyReducers } = require("./schema.js");
  await generateFirebaseData(
    {
      schema,
      count,
      keyReducers,
    },
    {
      firebase,
      credential,
      databaseURL,
    }
  );
  // Done 👍
})();
