
import { Injectable } from '@angular/core';
import { CarbServiceProvider } from '../../providers/carb-service/carb-service';
import { AlertController } from 'ionic-angular';




@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: CarbServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item? 'Edit Item' : 'Add Item',
      message: item? "Please enter the food item & total amount of carbs" :"Please enter the food item & total amount of carbs" ,
      inputs: [
        {
          name: 'name',
          placeholder: 'Food item',
          value: item? item.name : null 
        },

      {
        name: 'quantity',
        placeholder: 'Total amount of carbs',
        value: item? item.quantity : null
      },
    ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item,index);
            }
            else {
              this.dataService.addItem(item);
            }
           
          }
        }
      ]
    });
    prompt.present();
  }



}


