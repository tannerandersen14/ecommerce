var express = require('express'),
  bodyParser = require('body-parser'),
  mongo = require('mongojs'),
  cors = require('cors'),
  app = express(),
  db = mongo('eCommerce'),
  collection = db.collection('products'),
  port = 4545;

app.use(bodyParser.json());

app.post('/api/products', function(req, res, next) {
  collection.insert(req.body, function(err, resp) {
    return resp.status(200).send(resp);
  });
});
app.get('/api/products', function(req, res, next) {
  var query = {};
  if (req.query.id) {
    query._id = mongo.ObjectId(req.query.id);
  }
  if (req.query.title) {
    query.title = req.query.title;
  }
  collection.find(query, function(err, resp) {
    return resp.status(200).send(resp);
  })
})
app.put('/api/products/:id', function(req, res, next) {
  if (!req.query.id) {
    return res.status(400).send('No ID specified.');
  }
  var query = {
    _id: mongo.ObjectId(req.query.id)
  }
  collection.update(query, req.body, function(err, resp) {
    if (err) {
      return res.status(500).json(Error);
    }
    else if (resp) {
      return res.json(resp);
    }
  })
})
app.delete('/api/products/:id', function(req, res, next) {
  if(!req.query.id) {
    return res.status(400).send('No ID specified.');
  }
  var query = {
    _id: mongo.ObjectId(req.query.id)
  }
  collection.remove(query, function(err, resp) {
    if (err) {
      return res.status(500).json(Error);
    }
    else if (resp) {
      return res.json(resp);
    }
  })
})



  app.listen(port, function() {
    console.log('Listening on ', port);
  })
