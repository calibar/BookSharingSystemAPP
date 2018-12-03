import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookInfoModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
/**
 * Generated class for the BorrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borrow',
  templateUrl: 'borrow.html',
})
export class BorrowPage {
  public username :string
  public books:BookInfoModel[]
  public book:BookInfoModel
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service:ServiceProvider) {
      this.books=[]
  }

  ionViewWillEnter(){
    
    this.loadBorrowedBooks();
    console.log(this.books)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BorrowPage');

  }
  loadBorrowedBooks(){
    this.username=localStorage.getItem("currentUser")
    this.service.getBorrowedBooks(this.username)
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
  GenerateQR(){

  }
}
