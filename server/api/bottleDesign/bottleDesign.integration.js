'use strict';

var app = require('../..');
import request from 'supertest';

var newBottleDesign;

describe('BottleDesign API:', function() {

  describe('POST /api/bottleDesigns', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bottleDesigns')
        .send({
          canvas: '{"some" : "value"}'
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
      newBottleDesign.canvas.should.equal('{"some" : "value"}');
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
      newBottleDesign.canvas.should.equal('{"some" : "value"}');
    });

  });

});
