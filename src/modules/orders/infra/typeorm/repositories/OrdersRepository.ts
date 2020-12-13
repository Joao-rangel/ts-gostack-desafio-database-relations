import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    const newOrder = await this.ormRepository.save(order);

    return newOrder;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const foundOrder = await this.ormRepository.findOne(id);

    return foundOrder;
  }
}

export default OrdersRepository;
