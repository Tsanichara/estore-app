import { Component } from '@angular/core';
import { PastOrder, PastOrderProduct } from '../types/order.type';

@Component({
  selector: 'app-past-orders',
  imports: [],
  templateUrl: './past-orders.html',
  styleUrl: './past-orders.css'
})
export class PastOrders {
  pastOrderProducts: PastOrderProduct[] = [
    {
    amount: 100,
    price: 50,
    productId: 1,
    productImage: 'shop-1.jpg',
    productName: 'Jacket',
    qty: 1,
    }
  ];

  pastOrder: PastOrder = {
    address: 'Sample Address',
    city: 'JC',
    orderDate: '03/01/23',
    pin: '12345',
    state: 'NY',
    total: 100,
    userName: 'Thomas Brown'
  };


}
