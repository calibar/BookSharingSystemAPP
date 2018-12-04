import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { BookInfoModel,MessageInfoModel,MessageWithIdModel,MessageWithTimeModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
/**
 * Generated class for the MessageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message-detail',
  templateUrl: 'message-detail.html',
})
export class MessageDetailPage {
  public receiver:string
  public newmsg:MessageInfoModel
  public olodmsg:MessageWithTimeModel
  public oldId:string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private service:ServiceProvider,
    private view:ViewController) {
      this.newmsg=new MessageInfoModel
      this.olodmsg=new MessageWithTimeModel
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageDetailPage');
    var mdata=this.navParams.get('data');
    this.olodmsg.Id=mdata.id
    this.olodmsg.Content=mdata.content
    this.olodmsg.Sender=mdata.receiver
    this.olodmsg.SendingTime=mdata.sendingTime
    this.newmsg.Sender=localStorage.getItem("currentUser")
    this.newmsg.Receiver=mdata.receiver
    console.log(mdata)
  }
  closeModal(){
    this.view.dismiss();
  }
  SendMessage(message:MessageInfoModel){
    this.service.sendMessageTo(this.newmsg)
    .subscribe((res:any)=>{
     if(res.Sender==this.newmsg.Sender){

       this.olodmsg.IsDealed=true
       this.service.updateMessageById(this.oldId,this.olodmsg)
       .subscribe(res=>{
         if (res=="OK"){
          alert("Sending Success")
         }else{
           alert("Old message has not been changed")
         }
       },err=>{
         alert(err)
       })
     }else{
       alert("Message has not been sent.")
     }
    },err=>{
      alert(err)
    })
    this.closeModal()
  }
}
