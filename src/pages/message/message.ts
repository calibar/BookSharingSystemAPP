import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { BookInfoModel,MessageWithTimeModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  public msg:MessageWithTimeModel
  public msgs:MessageWithTimeModel[]
  public username:string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private service:ServiceProvider,
    private modal:ModalController) {
      this.msgs=[]
      this.msg=new MessageWithTimeModel
      this.username=localStorage.getItem("currentUser")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.loadMessage()
  }
  loadMessage(){
    this.service.getRecievedMessages(this.username)
    .subscribe((res:any)=>{
      res.forEach(element => {
        console.log(element)
        this.msg=new MessageWithTimeModel
        this.msg.Id=element.Id
        this.msg.Sender=element.Sender
        this.msg.Content=element.Content
        this.msg.SendingTime=element.SendingTime
        var times=this.msg.SendingTime.split('-06')
        this.msg.SendingTime=times[0]
        var dates=this.msg.SendingTime.split('T')
        this.msg.SendingTime=dates[0]+" "+dates[1]
        this.msgs.push(this.msg)
      });
     
    },err=>{
      alert(err)
    })
  }
  doRefresh(refresher) {
    this.msgs=[]
    this.loadMessage()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  openModal(message:MessageWithTimeModel){
    var times=message.SendingTime.split(' ')
    message.SendingTime=times[0]+"T"+times[1]+"-06:00"
    const mdetail={
      id: message.Id,
      receiver: message.Sender,
      content: message.Content,
      sendingTime:message.SendingTime
    }
    const msgDetailModal=this.modal.create('MessageDetailPage',{data:mdetail})
    msgDetailModal.present()
  }
}
