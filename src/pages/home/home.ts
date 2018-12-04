import { Component } from '@angular/core';
import { NavController,NavParams,ModalController } from 'ionic-angular';
import {LoginPage} from "../../pages/login/login"
import {BarcodeScanner} from '@ionic-native/barcode-scanner'
import {TabsPage} from "../../pages/tabs/tabs"
import {ServiceProvider} from "../../providers/service/service"
import{MessagePage}from "../../pages/message/message" 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public username:string
  public userrank:string
  public userCampus:string
  public lends:string
  public borrows:string
  public posts:string
  public scannedCode=null
  public MessageNumber:number
  constructor(public navCtrl: NavController,
    private navParams:NavParams,
    private modal:ModalController,
    private service:ServiceProvider,
    private barcode:BarcodeScanner) {
    this.username=localStorage.getItem("currentUser")
    this.MessageNumber=0

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowPage');
    this.userrank=localStorage.getItem("currentUserRank")
    this.userCampus=localStorage.getItem("currentUserCampus")
    this.lends=localStorage.getItem("currentUserLends")
    this.borrows=localStorage.getItem("currentUserBorrows")
    this.posts=localStorage.getItem("currentUserPosts")
    console.log(this.userrank)
    var rank = Number(this.userrank)
    if (rank%10==1) {
      this.userrank=this.userrank+"st"
    } else if(rank%10==2){
      this.userrank=this.userrank+"nd"
    } else if(rank%10==3){
      this.userrank=this.userrank+"rd"
    }else{
      this.userrank=this.userrank+"th"
    }
    this.loadMessage()
  }
  doRefresh(refresher) {
    this.userrank=localStorage.getItem("currentUserRank")
    this.userCampus=localStorage.getItem("currentUserCampus")
    this.lends=localStorage.getItem("currentUserLends")
    this.borrows=localStorage.getItem("currentUserBorrows")
    this.posts=localStorage.getItem("currentUserPosts")
    console.log(this.userrank)
    var rank = Number(this.userrank)
    if (rank%10==1) {
      this.userrank=this.userrank+"st"
    } else if(rank%10==2){
      this.userrank=this.userrank+"nd"
    } else if(rank%10==3){
      this.userrank=this.userrank+"rd"
    }else{
      this.userrank=this.userrank+"th"
    }
    this.loadMessage()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  loadMessage(){
    this.MessageNumber=0
    this.service.getRecievedMessages(this.username)
    .subscribe((res:any)=>{
        res.forEach(element => {
          this.MessageNumber+=1;
          console.log("+1")
        });
    },err=>{
      console.log(err)
    })
  }
 scanner(){
   this.barcode.scan().then(res=>{
     if (res.cancelled) {
      this.navCtrl.setRoot(TabsPage)
      this.navCtrl.popToRoot
     } else {
      this.scannedCode=res.text
      this.openModal(this.scannedCode)
      alert(this.scannedCode)
     }
  
   })
 }
 gotoMessageBox(){
   this.navCtrl.push(MessagePage)
 }
 openModal(bookid:string){
  const confirm_modal=this.modal.create('ConfirmmodalPage',{data:bookid})
  confirm_modal.present()
}
  logout(){
    this.navCtrl.setRoot(LoginPage)
    this.navCtrl.popToRoot()
  }
}
