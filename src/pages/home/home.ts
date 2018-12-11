import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CarbServiceProvider } from '../../providers/carb-service/carb-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController, public inputDialogService: InputDialogServiceProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: CarbServiceProvider, public socialSharing: SocialSharing) {

  }


  loadItems() {
    return this.dataService.getItems();
  }

  removeItem(item, index) {
    console.log("Removing Item -- ", item, index);
   
      this.dataService.removeItem(index);
      
  }


  shareItem(item, index) {
    console.log("Sharing Item -- ", item, index);

let message = "Food Item - Name: " + item.name + " - Quantity: " + item.quantity;
let subject = "Shared via Carb Loader App";
this.socialSharing.share(message, subject).then(() => {

}).catch(() => {

});

  }


  editItem(item, index) {
    console.log("Edit Item -- ", item, index);
    
      this.inputDialogService.showPrompt(item,index);
   
  }


  addItem() { 
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

 


}