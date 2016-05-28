'use strict';

var app = require('../..');
import request from 'supertest';

var newBottleDesign;

describe('BottleDesign API:', function() {

  describe('GET /api/bottleDesigns', function() {
    var bottleDesigns;

    beforeEach(function(done) {
      request(app)
        .get('/api/bottleDesigns')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bottleDesigns = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bottleDesigns.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bottleDesigns', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bottleDesigns')
        .send({
          name: 'New BottleDesign',
          info: 'This is the brand new bottleDesign!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBottleDesign = res.body;
          done();
        });
    });

    it('should respond with the newly created bottleDesign', function() {
      newBottleDesign.name.should.equal('New BottleDesign');
      newBottleDesign.info.should.equal('This is the brand new bottleDesign!!!');
    });

  });

  describe('GET /api/bottleDesigns/:id', function() {
    var bottleDesign;

    beforeEach(function(done) {
      request(app)
        .get('/api/bottleDesigns/' + newBottleDesign._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bottleDesign = res.body;
          done();
        });
    });

    afterEach(function() {
      bottleDesign = {};
    });

    it('should respond with the requested bottleDesign', function() {
      bottleDesign.name.should.equal('New BottleDesign');
      bottleDesign.info.should.equal('This is the brand new bottleDesign!!!');
    });

  });

  describe('PUT /api/bottleDesigns/:id', function() {
    var updatedBottleDesign;

    beforeEach(function(done) {
      request(app)
        .put('/api/bottleDesigns/' + newBottleDesign._id)
        .send({
          name: 'Updated BottleDesign',
          info: 'This is the updated bottleDesign!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBottleDesign = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBottleDesign = {};
    });

    it('should respond with the updated bottleDesign', function() {
      updatedBottleDesign.name.should.equal('Updated BottleDesign');
      updatedBottleDesign.info.should.equal('This is the updated bottleDesign!!!');
    });

  });

  describe('DELETE /api/bottleDesigns/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bottleDesigns/' + newBottleDesign._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bottleDesign does not exist', function(done) {
      request(app)
        .delete('/api/bottleDesigns/' + newBottleDesign._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
