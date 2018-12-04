import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController } from 'ionic-angular';
import { BookInfoModel,MessageInfoModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
/**
 * Generated class for the ConfirmmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmmodal',
  templateUrl: 'confirmmodal.html',
})
export class ConfirmmodalPage {
  public book:BookInfoModel
  public isOwner=false
  public Rating:string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private view:ViewController,
    private alertCtrl:AlertController,
    private service:ServiceProvider) {
      this.book=new BookInfoModel
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmmodalPage');
    var bookid=this.navParams.get('data')
    this.loadBookInfo(bookid)
  }
  loadBookInfo(bookid:string){
    this.service.getBookById(bookid)
    .subscribe((res:any)=>{
      this.book=new BookInfoModel
      this.book.Id=res.Id;
      this.book.BookName=res.BookName;
      this.book.BookAuthor=res.BookAuthor;
      this.book.BookDescription=res.BookDescription;
      this.book.BookCover=res.BookCover;
      this.book.BookOwner=res.BookOwner;
      this.book.BookBorrower=res.BookBorrower;
      this.book.Campus=res.Campus;
      this.book.PostExpiration=res.PostExpiration;
      this.book.ExpectReturnTime=res.ExpectReturnTime;
      this.book.ActualReturnTime=res.ActualReturnTime;
      this.book.OwnerRating=res.OwnerRating;
      this.book.BorrowerRating=res.BorrowerRating;
      this.book.OwnerComment=res.OwnerComment;
      this.book.BorrowerComment=res.BorrowerComment;
      this.book.BookStatus=res.BookStatus;
      if (this.book.BookStatus=="borrowed"){
        this.isOwner=true
      }
    },err=>{
      alert("error to get book")
    })
  }
  closeModal(){
    this.view.dismiss();
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Your Comments of this sharing',
      inputs: [
        {
          name: 'Rating',
          placeholder: 'Score',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Rating',
          handler: data => {
            if (data.Rating==1||2||3||4||5) {
                this.book.OwnerRating=data.Rating
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  Confirm(){
    if (this.book.BookStatus=="post") {
      this.book.BookBorrower=localStorage.getItem("currentUser")
      this.book.BookStatus="borrowed"
      this.service.updateBookById(String(this.book.Id),this.book)
      .subscribe(res=>{
        if (res=="OK") {
          alert("Comfirm Borrow Book"+this.book.BookName+" from "+this.book.BookOwner)
          this.closeModal()
        }else{
          alert("Error Happened")
          this.closeModal()
        }
      },err=>{
        alert(err)
      })
    } else if(this.book.BookStatus=="borrowed"){
      this.book.OwnerRating=Number(this.Rating)
      
      this.book.BookStatus="returned"
        this.service.updateBookById(String(this.book.Id),this.book)
        .subscribe(res=>{
          if (res=="OK") {
            alert("Comfirm Book "+this.book.BookName+" returned from "+this.book.BookBorrower)
            this.closeModal()
          }else{
            alert("Error Happened")
            this.closeModal()
          }
        },err=>{
          alert(err)
        })
      }
     
    }
}
