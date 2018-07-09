'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');

const lyric = require('./models/lyrics');


let titlesList = [];

router.post('/api/created',( req, res, next) => {
  
  

  titlesList.push(req.body);
  console.log(req.body);
  
  res.json(titlesList);
});
  
router.get('/api/created', (req,res,next)=>{
  res.json(titlesList);
});

module.exports = router;