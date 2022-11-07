import { OrderDetail } from 'src/orderDetails/schemas/orderDetails.schema';
import { Order } from 'src/orders/schemas/orders.schema';

export type OrdersData = Order & { orderDetails: OrderDetail[] };
