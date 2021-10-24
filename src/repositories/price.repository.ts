import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Price, PriceRelations} from '../models';

export class PriceRepository extends DefaultCrudRepository<
  Price,
  typeof Price.prototype.zona,
  PriceRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Price, dataSource);
  }
}
