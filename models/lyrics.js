'use strict';

const mongoose = require('mongoose');


const lyricSchema = new mongoose.Schema({
  artist: String, required: false,
  title: { type: String },
  lyrics: String,
  notes: String,
  comments:[{highlight: String,
    remark: String}]
});

lyricSchema.set('timestamps', true);

lyricSchema.set('toObject', {
  virtuals: true,     // include built-in virtual `id`
  versionKey: false,  // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});
  
lyricSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    artist: this.artist,
    title: this.title,
    lyrics: this.lyrics,
    notes: this.notes,
    highlight: this.highlight,
    remark: this.remark
  };
};



module.exports = mongoose.model('lyric', lyricSchema);