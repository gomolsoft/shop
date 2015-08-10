/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  /** @ngInject */
  export class ProductsController {
    private dataProvider: DataProvider
    private products: IProduct[]

    constructor (DataProvider: DataProvider) {
      this.dataProvider = DataProvider;

      this.dataProvider.devices((p: IProduct[]) => this.products = p);
    }
  }
}
