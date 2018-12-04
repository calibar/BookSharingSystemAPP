import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookInfoModel} from '../../models/models'
import {ServiceProvider} from "../../providers/service/service"
import {LoginPage} from "../../pages/login/login"
/**
 * Generated class for the PostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {


  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
    this.bookidqr=''
    this.loadBorrowedBooks();
    console.log(this.books)
  }
  public username :string
  public books:BookInfoModel[]
  public book:BookInfoModel
  public bookidqr:string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service:ServiceProvider) {
      this.books=[]
  }

  ionViewWillEnter(){
   
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
    this.service.getPostBooks(this.username)
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
  logout(){
    this.navCtrl.setRoot(LoginPage)
    this.navCtrl.popToRoot()
  }
  GenerateQR(book:BookInfoModel){
this.bookidqr=String(book.Id)
console.log(this.bookidqr)
    // Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
modal.style.display="block";
// Get the <span> element that closes the modal
let span:HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}
  }
}
