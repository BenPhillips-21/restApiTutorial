var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const models = require('../models/index.js');

router.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

router.put('/messages/:messageId', (req, res) => {
    const newMessage = {
    id: req.params.messageId,
    text: req.body.text,
    userId: req.context.me.id,
  };
  req.context.models.messages[req.params.messageId] = newMessage;
  return res.send(req.context.models.messages[req.params.messageId]);
})

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

router.get('/', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

module.exports = router;
