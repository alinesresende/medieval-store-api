// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import sinon from 'sinon';
// import app from '../../../src/app';
// import { generateToken } from '../../../src/utils/jwt';

// chai.use(chaiHttp);

// describe('POST /login', function () {
//   beforeEach(function () {
//     sinon.restore();
//   });

//   it('Teste /login', async function () {
//     const httpResponse = await chai.request(app).post('/login').send({
//       username: 'Hagar',
//       password: 'terrível',
//     });

//     expect(httpResponse.status).to.equal(200);
//     expect(httpResponse.body).to.be.deep.equal({
//       token: generateToken({ id: 1, username: 'Hagar' }),
//     });
//   });
// });
