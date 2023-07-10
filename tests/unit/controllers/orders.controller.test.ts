import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ordersController from '../../../src/controller/orders.controller';
import ordersService from '../../../src/service/orders.service';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Se é possível lista todos os produtos', async function() {
    const orderMock = {
      id: 1,
      userId: 1,
      productIds: [1]
    }

    const orders =  [orderMock]

    sinon.stub(ordersService, 'getAllOrders').resolves(orders);
    await ordersController.getAllOrders(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(orders);
  })

});
