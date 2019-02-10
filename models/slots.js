const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  slot: {
    type: String,
  }
});

const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;