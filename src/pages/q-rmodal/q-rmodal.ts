import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { BookInfoModel,MessageInfoModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
/**
 * Generated class for the QRmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-q-rmodal',
  templateUrl: 'q-rmodal.html',
})
export class QRmodalPage {
  public bookid:string
  public receiver:string
  public msg:MessageInfoModel
  constructor(public navCtrl: NavController, public navParams: NavParams, 
   private view :ViewController,
   private service:ServiceProvider) {
     this.msg=new MessageInfoModel
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QRmodalPage');
    var book=this.navParams.get('data');
    this.bookid=book.id 
    this.receiver=book.receiver
    console.log(this.receiver)
    this.msg.Sender=localStorage.getItem("currentUser")
    this.msg.Receiver=this.receiver
  }
  closeModal(){
    this.view.dismiss();
  }
  SendMessage(message:MessageInfoModel){
    console.log(this.msg)
    this.service.sendMessageTo(this.msg)
    .subscribe((res:any)=>{
     if(res.Sender==this.msg.Sender){
       alert("Sending Success")
     }else{
       alert("Message has not been sent.")
     }
    },err=>{
      alert(err)
    })
    this.closeModal()
  }
}
