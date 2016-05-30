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

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
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

// Creates a new BottleDesign in the DB
export function show(req, res) {
  return BottleDesign.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
