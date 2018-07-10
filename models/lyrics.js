'use strict';

const mongoose = require('mongoose');

const lyricSchema = new mongoose.Schema({
  artist: String, required: false,
  title: { type: String, required: true },
  lyrics: String,
  notes: String
});

lyricSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});
  
lyricSchema.methods.apiRepr = function() {
  return {
      
    artist: this.artist,
    title: this.title,
    lyrics: this.lyrics,
    notes: this.notes
  };
};

module.exports = mongoose.model('lyric', lyricSchema);