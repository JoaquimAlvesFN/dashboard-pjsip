const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const AmiClient = require('asterisk-ami-client');

app.use(express.json());
app.use(cors());

const client = new Promise((resolve, reject) => {
    try {
        let ami = new AmiClient();
        
        ami.connect('asterisk', 'asterisk', {
            host: '192.168.0.106',
            port: '5038'
        }).then(() => {
            resolve(ami)
        })
    } catch (error) {
        reject(error)        
    }

});


client.then(res => {
    res.on('event', evt => {
        if(evt.Event == 'PeerStatus'){
	  if(evt.PeerStatus == 'Reachable' || evt.PeerStatus == 'Unreachable'){
		  console.log(evt);
		  io.emit('peerstatus', evt);
	  }
        }

        if(evt.Event == 'Newchannel'){
            io.emit('newchannel', evt);
        }

        if(evt.Event == 'Newstate'){
            io.emit('newstate', evt);
        }

        if(evt.Event == 'Hangup'){
            io.emit('hangup', evt);
        }
    })
});


/*app.get('/ramais/list', (req, res) => {
  ariclient.connect('http://192.168.0.106:8089', 'asterisk', 'asterisk')
  .then(function (ari) {
      ari.endpoints.list()
        .then(function(result) {
	  return res.json(result);
	})
        .catch(function(err) {
	  console.log(err);
	})
  })
  .catch(function (err) { console.log(err)});
});*/



server.listen(3333);
