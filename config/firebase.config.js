const admin = require("firebase-admin");

const serviceAccount = require("../firebase/firebaseSAKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://byte-bazaar-da07e.firebaseio.com",
});

module.exports = admin;
