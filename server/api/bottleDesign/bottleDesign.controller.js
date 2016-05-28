/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bottleDesigns              ->  index
 * POST    /api/bottleDesigns              ->  create
 * GET     /api/bottleDesigns/:id          ->  show
 * PUT     /api/bottleDesigns/:id          ->  update
 * DELETE  /api/bottleDesigns/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import BottleDesign from './bottleDesign.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Creates a new BottleDesign in the DB
export function create(req, res) {
  return BottleDesign.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
