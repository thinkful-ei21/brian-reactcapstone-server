'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const morgan = require('morgan');

const Lyric = require('./models/lyrics');




router.post('/',( req, res, next) => {
  console.log(req.body);
  const { artist, title, lyrics } = req.body;
  const newSong = {artist, title, lyrics};
  
  
  
  Lyric.create(newSong)
    .then(item => {
      if (item) {
        res.location(`${req.originalUrl}`).status(201).json(item);
      }
    }).catch(err => {
      next(err);
    });

  
});
router.post('/:id/comments',( req, res, next) => {
  const {  remark, highlight } = req.body;
  const newComments = { remark, highlight};
  const lyricid = req.params.id;
  

  console.log(newComments,lyricid);
  Lyric.update(
    {_id: lyricid},
    { $push: {comments: newComments}}
  )
    .then(item => {
      if (item) {
        res.location(`${req.originalUrl}`).status(201).json(item);
      }
    }).catch(err => {
      next(err);
    });

  
});
  
router.get('/', (req,res) => {
  console.log(res);

  Lyric.find()
    //.sort({createdAt:'title'})
    .exec()
    .then(lyrics => {
      res.json({
        lyrics: lyrics.map( lyric => lyric.apiRepr())
      }); 
    })

    .catch(err => { console.log(err); 
      return res.status(500).json({message: 'Internal server error'}); 
    }); 
});
/////add base 
router.get('/:id/comments', (req,res) => {
  console.log(res);
  let id = req.params.id;
  Lyric.findById(id)
    .exec()
    .then(lyrics => {
      res.json(lyrics.comments);
    })

    .catch(err => { console.log(err); 
      return res.status(500).json({message: 'Internal server error'}); 
    }); 
});



//DELETE ROUTE AND PUT ROUTE
router.delete('/:id', (req,res,next) => {
  const id = req.params.id;

  Lyric.findOneAndRemove(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

//    CONTINUE HERE 
router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  Lyric.findByIdAndUpdate(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

// res.json(titlesList);



module.exports = router;

// router.get('/', (req, res) => {
//   Lyric.find() 
//     .exec() 
//     .then(characters => {
//       res.json({ 
//         characters: characters.map( character => character.apiRepr() ) }); }) 
//     .catch(err => { console.log(err); return res.status(500).json({message: 'Internal server error'}); }); });