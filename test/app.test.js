const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
  it('should return an array of apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
  })
 it('should only accept App or Rating as sort parameters', () => {
    return supertest(app)
    .get('/apps')
    .query({ sort: 'MISTAKE'})
    .expect(400, 'Sort must be of app or rating')
 })
 it('should filter apps based on genre query', () => {
     return supertest(app)
     .get('/apps')
     .query( { genres: 'arcade' } )
     .expect(200)
     .then( res => {
         for(let i = 0; i < res.length; i++) {
             expect(res.body[i].to.include( { "Genre": "Arcade"}))
             expect(res.body[i].to.not.include( { "Genre": "Card"}))
         }
     })
    })
     it('should return [] when no genre match is found', () => {
         return supertest(app)
         .get('/apps')
         .query( { genres: 'mistake' } )
         .expect(200)
         .then( res => {
             expect(res.body).to.eql([])
         })
     })
 })

