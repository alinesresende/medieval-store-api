import { expect } from 'chai';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import ordersService from '../../../src/service/orders.service';


describe('OrdersService', function () {
  beforeEach(function () { sinon.restore(); });
  it('Se é possível listar os pedidos', async function(){
       const orderMockData = [
      {
        dataValues: {
          id: 1,
          userId: 1,
          productIds: [{ id: 2 }, { id: 1 }]
        },
        productIds: [{ id: 2 }, { id: 1 }]
      }
    ];

    const expectedList = [
      {
        id: 1,
        userId: 1,
        productIds: [2, 1],
      }
    ];

    sinon.stub(OrderModel, 'findAll').resolves(orderMockData as any);
    sinon.stub(ProductModel, 'findAll').resolves(orderMockData[0].productIds as any);

    const result = await ordersService.getAllOrders();

    expect(result).to.deep.equal(expectedList.map(item => ({ ...item, productIds: item.productIds })));
  })

  it('Se é possível listar os pedidos2', async function(){
    const orderMockData = [
   {
     dataValues: {
       id: 1,
       userId: 1,
     },
   }
 ];

 const expectedList = [
   {
     id: 1,
     userId: 1,
     productIds: [],
   }
 ];

 sinon.stub(OrderModel, 'findAll').resolves(orderMockData as any);
 sinon.stub(ProductModel, 'findAll').resolves([]);

 const result = await ordersService.getAllOrders();

 expect(result).to.deep.equal(expectedList.map(item => ({ ...item, productIds: item.productIds })));
})
});
