import chai, { expect } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import productsController from '../../../src/controller/products.controller';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/products.service';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });
  it('Se é possível cadastrar novo produto', async function() {
    const productMockModel = ProductModel.build({ name: "Martelo de Thor", price: "30 peças de ouro", orderId: 4});
    req.body = productMockModel;
    sinon.stub(productsService, 'newProduct').resolves(productMockModel);
    await productsController.newProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productMockModel);
  })

  it('Se é possível lista todos os produtos', async function() {
    const productMockModelOne = ProductModel.build({
      id: 1,
      name: "Excalibur",
      price: "10 peças de ouro",
      orderId: 1
    },)
    const productMockModelTwo = ProductModel.build({
      id: 2,
      name: "Espada Justiceira",
      price: "20 peças de ouro",
      orderId: 1
    },)
    const listProducts = [productMockModelOne, productMockModelTwo]
    req.body = listProducts;
    sinon.stub(productsService, 'getAllProducts').resolves(listProducts);
    await productsController.getAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(listProducts);
  })

});
