'use strict';

import mongoose from 'mongoose';

var BottleDesignSchema = new mongoose.Schema({
  canvas: Object
});

export default mongoose.model('BottleDesign', BottleDesignSchema);
