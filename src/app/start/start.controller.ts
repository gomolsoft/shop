/// <reference path="../index.module.ts" />

module shop {
  'use strict';

  export class StartController {
    private datas: IProduct[]
    private dataProvider: DataProvider

    /* @ngInject */
    constructor (DataProvider: DataProvider) {
      this.dataProvider = DataProvider;

    }

    dataloaded( ) {
    }

    demo() {
      this.dataProvider.test(() => this.dataloaded());
    }
  }
}
