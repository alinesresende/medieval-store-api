import bcrypt from 'bcryptjs';
import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import loginController from '../../../src/controller/login.controller';
import UserModel from '../../../src/database/models/user.model';
import { SALT_ROUNDS } from '../../../src/database/seeders/1-users';
import loginService from '../../../src/service/login.service';
import { LoginPayload } from '../../../src/types/LoginPayload';
import { generateToken } from '../../../src/utils/jwt';


chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request & { user: LoginPayload };
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Se é gerado token ao acessar o login', async function (){
    const userMock = UserModel.build({
      id: 1,
      password: bcrypt.hashSync('terrível', SALT_ROUNDS),
      level: 10,
      username: 'Hagar',
      vocation: 'Guerreiro',
    });
    sinon.stub(UserModel, 'findOne').resolves(userMock);

    req.body = {
      username: 'Hagar',
      password: "terrível"
    };

    const user = {
      id: 1,
      username: 'Hagar',
    }
    req.user = user;
    await loginController.login(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({
      token: generateToken(user)
  })
})

it('Se é não é gerado token ao acessar o login', async function (){
  const userMock = UserModel.build({
    id: 1,
    password: bcrypt.hashSync('terrível', SALT_ROUNDS),
    level: 10,
    username: 'Hagar',
    vocation: 'Guerreiro',
  });
  sinon.stub(UserModel, 'findOne').resolves(userMock);

  req.body = {
    username: 'Hagar',
    password: "terrível"
  };

  const user = {
    id: 1,
    username: 'Hagar',
  }
  req.user = user;
  sinon.stub(loginService, 'login').resolves(undefined);
  await loginController.login(req, res);
  expect(res.status).to.have.been.calledWith(400);
  expect(res.json).to.have.been.calledWith({ message: 'token not created' })
})


});
