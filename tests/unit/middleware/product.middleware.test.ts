import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { checkName, checkPrice } from '../../../src/middleware/product.validate';

chai.use(sinonChai);

describe('LoginMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando checkName funciona', function () {
    const next = sinon.stub().returns({});
    req.body = {
      name: 'Hagar',
    };
    checkName(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se middlware checkName possui name preenchido', function () {
    const next = sinon.stub().returns({});
    req.body = {
      name: '',
    };
    checkName(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({
      message: '"name" is required',
    });
  });

  it('Testando se middlware checkName possui "name" enviado como string', function () {
    const next = sinon.stub().returns({});
    req.body = {
      name: 45,
    };
    checkName(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({
      message: '"name" must be a string',
    });
  });

  it('Testando se middlware checkName possui "name" maior que três caracteres', function () {
    const next = sinon.stub().returns({});
    req.body = {
      name: 'Ha',
    };
    checkName(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({
      message: '"name" length must be at least 3 characters long',
    });
  });
  

  it('Testando checkPrice funciona', function () {
    const next = sinon.stub().returns({});
    req.body = {
      price: '10 peças de our',
    };
    checkPrice(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando se middlware checkPrice possui price preenchido', function () {
    const next = sinon.stub().returns({});
    req.body = {
      price: '',
    };
    checkPrice(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({
      message: '"price" is required',
    });
  });

  it('Testando se middlware checkPrice possui "price" enviado como string', function () {
    const next = sinon.stub().returns({});
    req.body = {
      price: 45,
    };
    checkPrice(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({
      message: '"price" must be a string',
    });
  });


  it('Testando se middlware checkPrice possui "price" maior que três caracteres', function () {
    const next = sinon.stub().returns({});
    req.body = {
      price: 'Ha',
    };
    checkPrice(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({
      message: '"price" length must be at least 3 characters long',
    });
  });
})