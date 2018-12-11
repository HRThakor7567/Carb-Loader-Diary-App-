
import { Injectable } from '@angular/core';


@Injectable()
export class CarbServiceProvider {

  title = "Carb Loader";
  items = []


  constructor() {
    console.log('Hello CarbServiceProvider Provider');
  }


getItems() { return this.items;

}

  removeItem(index){this.items.splice(index, 1);

  }

  addItem(item) {this.items.push(item);}

  editItem(item,index) {this.items[index] = item;

  }
}