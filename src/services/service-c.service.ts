import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ServicecDataSource} from '../datasources';

export interface ServiceC {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  calcularenvio(postalcode: string, weight: number): Promise<object>;
}

export class ServiceCProvider implements Provider<ServiceC> {
  constructor(
    // servicec must match the name property in the datasource json file
    @inject('datasources.servicec')
    protected dataSource: ServicecDataSource = new ServicecDataSource(),
  ) { }

  value(): Promise<ServiceC> {
    return getService(this.dataSource);
  }
}
