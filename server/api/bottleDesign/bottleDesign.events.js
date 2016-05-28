/**
 * BottleDesign model events
 */

'use strict';

import {EventEmitter} from 'events';
import BottleDesign from './bottleDesign.model';
var BottleDesignEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BottleDesignEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BottleDesign.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BottleDesignEvents.emit(event + ':' + doc._id, doc);
    BottleDesignEvents.emit(event, doc);
  }
}

export default BottleDesignEvents;
