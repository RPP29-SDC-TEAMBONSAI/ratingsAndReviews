const {expect} = require('chai');
const assert = require('assert');
// const should = chai.should();
const chai = require('chai')

const chaiHttp = require('chai-http');
const app = require('../server/index.js');
// const request = require('supertest')('http://localhost:3000/reviews');
const db = require('./index.js');
// const supertest = require('supertest');

chai.use(chaiHttp);

const {Pool, Client} = require('pg');
const psqlConfig = require('./config.js');

const pool = new Pool({
  user: psqlConfig.user,
  host: psqlConfig.host,
  database: psqlConfig.database,
  password: psqlConfig.password,
  port: psqlConfig.port
});

// chai.request('http://localhost:3000')
//   .get('/reviews?page=1&count=5&sort="newest"&product_id=36300')

describe('GET Reviews', () => {
  it('Get all reviews for a particular product id', (done) => {
    chai.request(app)
    .get('/reviews?page=1&count=5&sort="newest"&product_id=36300')
    .then((res) => {
      assert.equal(res.status, 200);
      done();
    })
    .catch((err) => {
      done(err);
      console.log(err);
    })
  })
})

describe('GET MetaData', () => {
  it('Get all review meta data for a particular product id', (done) => {
    chai.request(app)
    .get('/reviews/meta?product_id=36300')
    .then((res) => {
      assert.equal(res.status, 200);
      done();
    })
    .catch((err) => {
      done(err);
      console.log(err);
    })
  })
})

describe('PUT Helpful', () => {
  it('Successfully updates helpful column', (done) => {
    chai.request(app)
    .put('/reviews/:review_id/helpful')
    .send({id: 1})
    .then((res) => {

      assert.equal(res.status, 200);
      done();
    })
    .catch((err) => {
      done(err);
      console.log('PUT ERR', err);
    })
  })
})

describe('PUT Reported', () => {
  it('Successfully updates reported column', (done) => {
    chai.request(app)
    .put('/reviews/:review_id/report')
    .send({id: 1})
    .then((res) => {
      expect(res).to.have.status(200);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })
})

describe('POST Review', () => {
  it('Successfully adds new review', (done) => {
    chai.request(app)
    .post('/reviews/add')
    .send({
      product_id: 47421,
      rating: 4,
      summary: 'Test',
      body: 'sdkjbkjsdfbkjsdfngkjsfngkjfnkgjndfkjgndkfjgnkdjfgkjdfnjkg',
      recommend: false,
      name: 'dfgdfg',
      email: 'dfgdfg@fdg.com',
      photos: [],
      characteristics: { '158622': 1, '158623': 2, '158624': 2, '158625': 2 }
    })
    .then((res) => {
      expect(res).to.have.status(200);
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    })
  })
})