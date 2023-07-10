import { expect } from 'chai';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productsService from '../../../src/service/products.service';
import { Product } from '../../../src/types/Product';


describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Se é possível cadastrar novos produtos', async function (){
    const productMockModel = ProductModel.build({ name: "Martelo de Thor", price: "30 peças de ouro", orderId: 4});
    sinon.stub(ProductModel, 'create').resolves(productMockModel);
    const name = 'Martelo de Thor';
    const price = '30 peças de ouro';
    const orderId = 4;
    const result = await productsService.newProduct({name, price, orderId } as Product);
    expect(result.dataValues).to.be.equal(productMockModel.dataValues)
  })

  it('Se é possível listar todos os produto ', async function() {
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
    sinon.stub(ProductModel, 'findAll').resolves(listProducts);
    const result = await productsService.getAllProducts();
    expect(result).to.be.equal(listProducts)
  })

});
