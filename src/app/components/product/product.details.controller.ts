/// <reference path="../../index.module.ts" />

module shop {
  'use strict';

  interface IDetailsParams  {
    id: string
  }

  /** @ngInject */
  export class ProductDetailsController {
    private dataProvider: DataProvider
    private product: IProduct

    constructor (DataProvider: DataProvider, $stateParams: IDetailsParams) {
      this.dataProvider = DataProvider;
      this.dataProvider.product((product) => this.product = product, $stateParams.id)
    }
  }
}
