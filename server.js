const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON request bodies
var callapi = require('./callapi.js');

var crypto = require('crypto');
const app = express();
const port = 5000; // You can choose any available port

// Use the bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a POST route that handles incoming JSON data
app.post('/api/mintToken', async (req, res) => {
  const requestData = req.body; // JSON data from the request body
  console.log('Received data:', requestData);
   var resp = await callapi.mintToken(req.body.fromAddress, req.body.tokenID, req.body.amount)

  // Respond with a success message
  res.json({ resp });
});

app.post('/api/getBalance', async (req, res) => {
    const requestData = req.body; // JSON data from the request body
    console.log('Received data:', requestData);
     var resp = await callapi.getBalance(req.body.fromAddress, req.body.tokenID)
  console.log("resp---------",resp);
    // Respond with a success message
    res.json({resp});
  });

  app.post('/api/transferToken', async (req, res) => {
    const requestData = req.body; // JSON data from the request body
    console.log('Received data:', requestData);
     var resp = await callapi.transferToken(req.body.fromAddress,req.body.toAddress, req.body.tokenID,req.body.amount)
  console.log("resp---------",resp);
    // Respond with a success message
    res.json({ resp });
  });

 /* app.post('/api/buyToken', async (req, res) => {
    const requestData = req.body; // JSON data from the request body
    console.log('Received data:', requestData);
      await callapi.transferToken('0xF42BEb728B2a5A5a7277152A541D39B26b8110ca',req.body.toAddress, req.body.tokenID,req.body.amount)
     var result=`Buyer ${req.body.toAddress} buy  ${req.body.amount}`;
     console.log("result---------",result);
    // Respond with a success message
    res.json({ message: result });
  });

  app.post('/api/registerUser', async (req, res) => {
    const requestData = req.body; // JSON data from the request body
    console.log('Received data:', requestData);
    var result = {}
    result = {
        userId: requestData.userId,
        phoneno: requestData.phoneno,
        persona:requestData.persona,
        accountAddress:requestData.accountAddress
           }
           console.log("result-----$$", result);
      await CouchDBCommon.save(result)
    
     
    // Respond with a success message
    res.json({ message: "user register successfully" });
  });
  app.get('/api/getUserById/:phoneno', async (req, res) => {
    const phoneno = req.params.phoneno; // JSON data from the request body
    console.log('Received data:', phoneno);
    
    
    var result = await CouchDBCommon.find({ "phoneno": phoneno });
    
     
    // Respond with a success message
    res.json({ result });
  });*/
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
