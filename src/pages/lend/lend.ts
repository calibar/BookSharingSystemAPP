import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { BookInfoModel,MessageInfoModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
import {LoginPage} from "../../pages/login/login"
/**
 * Generated class for the LendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lend',
  templateUrl: 'lend.html',
})
export class LendPage {

  public username :string
  public books:BookInfoModel[]
  public book:BookInfoModel
  public bookidqr:string
  public msg:MessageInfoModel
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private modal:ModalController,
    public service:ServiceProvider) {
      this.books=[]
      this.msg=new MessageInfoModel
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LendPage');
    this.loadBorrowedBooks();
    console.log(this.books)
  }
  ionViewWillEnter(){
    this.bookidqr=''
 
  }
  openModal(book:BookInfoModel){
    this.bookidqr=String(book.Id)
    const bookid={
      id : this.bookidqr,
      receiver: book.BookBorrower
    }
    const qrModal=this.modal.create('QRmodalPage',{data:bookid})
    qrModal.present();
  }
  doRefresh(refresher) {
    this.books=[];
    this.loadBorrowedBooks();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
  loadBorrowedBooks(){
    this.username=localStorage.getItem("currentUser")
    this.service.getLendedBooks(this.username)
    .subscribe((res:any)=>{
      if(res){
        console.log(res)
        res.forEach(element => {
          this.book=new BookInfoModel
          this.book.Id=element.Id;
          this.book.BookName=element.BookName;
          this.book.BookAuthor=element.BookAuthor;
          this.book.BookDescription=element.BookDescription;
          this.book.BookCover=element.BookCover;
          this.book.BookOwner=element.BookOwner;
          this.book.BookBorrower=element.BookBorrower;
          this.book.Campus=element.Campus;
          this.book.PostExpiration=element.PostExpiration;
          this.book.ExpectReturnTime=element.ExpectReturnTime;
          this.book.ActualReturnTime=element.ActualReturnTime;
          this.book.OwnerRating=element.OwnerRating;
          this.book.BorrowerRating=element.BorrowerRating;
          this.book.OwnerComment=element.OwnerComment;
          this.book.BorrowerComment=element.BorrowerComment;
          this.book.BookStatus=element.BookStatus;
          this.books.push(this.book)
        });
   
      }
    }
    )
  }
  OpenMessageModal(abook:BookInfoModel){
    /*
      r*/
      this.username=localStorage.getItem("currentUser")
      this.msg.Sender=this.username
      this.msg.Receiver=abook.BookBorrower
      var modal = document.getElementById('myModal');

      
      // Get the <span> element that closes the modal
      let span:HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;
      modal.style.display = "block"; 
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
          modal.style.display = "none";
      }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      }
  }
  SendMessage(message:MessageInfoModel){
    console.log(this.msg)
    this.service.sendMessageTo(this.msg)
    .subscribe((res:any)=>{
     if(res.Sender==this.username){
       alert("Sending Success")
     }else{
       alert("Message has not been sent.")
     }
    },err=>{
      alert(err)
    })
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
   

  }
  logout(){
    this.navCtrl.setRoot(LoginPage)
    this.navCtrl.popToRoot()
  }
}
