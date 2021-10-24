import {Entity, model, property} from '@loopback/repository';

@model()
export class Price extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  zona: number;

  @property({
    type: 'number',
    required: true,
  })
  iva: number;

  @property({
    type: 'number',
    required: true,
  })
  comision: number;


  constructor(data?: Partial<Price>) {
    super(data);
  }
}

export interface PriceRelations {
  // describe navigational properties here
}

export type PriceWithRelations = Price & PriceRelations;
