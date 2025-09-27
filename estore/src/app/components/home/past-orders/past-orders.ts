import { Component, computed, effect, inject, signal } from '@angular/core';
import { PastOrder, PastOrderProduct } from '../types/order.type';
import { OrderService } from '../services/order/order-service';
import { UserService } from '../services/user/userService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-past-orders',
  imports: [],
  templateUrl: './past-orders.html',
  styleUrl: './past-orders.css'
})
export class PastOrders {
  
  private orderService = inject(OrderService);
  private userService = inject(UserService);

  selectedOrderId = signal<number | null>(null);


  readonly pastOrderProducts = signal<PastOrderProduct[]>([]);

  readonly pastOrders =  toSignal(
    this.orderService.getOrders(this.userService.LoggedInUser.email), 
    {
      initialValue: [] as PastOrder[]
    }
  )


  readonly pastOrder = computed(() => this.pastOrders().find((o) => o.orderId === this.selectedOrderId()));

  constructor() {
    effect(() => {
      const id = this.selectedOrderId();
      if (id) {
        this.orderService.getOrderProducts(id).subscribe((producuts) => {
          this.pastOrderProducts.set(producuts);
        })
      } else {
        this.pastOrderProducts.set([]);
      }
    });
  }

  selectOrder(event: Event): void {
    const value = Number.parseInt((event.target as HTMLSelectElement).value);
    this.selectedOrderId.set(value > 0 ? value : null);
  }

}
