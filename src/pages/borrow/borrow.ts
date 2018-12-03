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
declare var QRious:any
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
    public service:ServiceProvider
    ) {
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
    // Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
/*let modalImg=document.getElementById("picture") as HTMLImageElement;
modal.style.display="block";
modalImg.src="http://www.griffithsrc.com.au/wp-content/uploads/2017/01/SRC_LOGO_PNG.png"*/
// Get the <span> element that closes the modal
modal.style.display="block";
let span:HTMLElement = document.getElementsByClassName('close')[0] as HTMLElement;

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
}
  }
}
