import bcrypt from 'bcryptjs';
import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import UserModel from '../../../src/database/models/user.model';
import { SALT_ROUNDS } from '../../../src/database/seeders/1-users';
import { arePasswordAndUsernameValid, doesPasswordAndUsernameExists } from '../../../src/middleware/login.validate';

chai.use(sinonChai);

describe('LoginMiddleware', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando doesPasswordAndUsernameExists funciona', function () {
    const next = sinon.stub().returns({});
    req.body = {
      username: 'Hagar',
      password: 'terrível',
    };
    doesPasswordAndUsernameExists(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando doesPasswordAndUsernameExists funciona 2', function () {
    const next = sinon.stub().returns({});
    req.body = {
      username: 'Hagar',
    };
    doesPasswordAndUsernameExists(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({
      message: '"username" and "password" are required',
    });
  });

  it('Testando arePasswordAndUsernameValid funciona', async function () {
    const next = sinon.stub().returns({});
    const userMock = UserModel.build({
      id: 2,
      password: bcrypt.hashSync('senhaForte', SALT_ROUNDS),
      level: 101,
      username: 'Nina',
      vocation: 'Maga',
    });
    sinon.stub(UserModel, 'findOne').resolves(userMock);

    req.body = {
      username: 'Nina',
      password: "senhaForte"
    };
    await arePasswordAndUsernameValid(req, res, next);
    expect(next).to.have.been.calledWithExactly();
  });

  it('Testando arePasswordAndUsernameValid funciona 2', async function () {
    const next = sinon.stub().returns({});
    const userMock = UserModel.build({
      id: 2,
      password: bcrypt.hashSync('senhaForte', SALT_ROUNDS),
      level: 101,
      username: 'Nina',
      vocation: 'Maga',
    });
    sinon.stub(UserModel, 'findOne').resolves(userMock);

    req.body = {
      username: 'Nina',
      password: "senhaFraca"
    };
    await arePasswordAndUsernameValid(req, res, next);
    expect(res.status).to.be.calledWith(401);
    expect(res.json).to.be.calledWithExactly({
      message: "Username or password invalid",
    });
  });
});
