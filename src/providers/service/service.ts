import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoModel,UserProfileInfoModel,MessageInfoModel, BookInfoModel,MessageWithIdModel} from '../../models/models'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  url="http://d4de8068.ngrok.io/v1/"

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
  }
  signup(user:UserInfoModel){
   var params=JSON.stringify(user)
   let seq=this.http.post(this.url+'login',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  login(username:string,pwd:string){
    const params = new HttpParams()
    .append("verify", username+"|"+pwd)
    
    let seq = this.http.get(this.url+'login', { responseType: 'json' ,params:params});
    return seq;
  }
  getUserProfile(username:string){
    const params= new HttpParams()
    .append("singleuser",username)
    let seq = this.http.get(this.url+'user_profile', { responseType: 'json' ,params:params});
    return seq;
  }
  postUserProfile(userProfile:UserProfileInfoModel){
    var params=JSON.stringify(userProfile)
   let seq=this.http.post(this.url+'user_profile',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  getBorrowedBooks(username:string){
    const params=new HttpParams()
    .append("query","BookStatus:borrowed,BookBorrower:"+username)
    .append("sortby","ExpectReturnTime")
    .append("order","asc")
    let seq = this.http.get(this.url+'book_transaction', { responseType: 'json' ,params:params});
    return seq;
  }
  getLendedBooks(username:string){
    const params=new HttpParams()
    .append("query","BookStatus:borrowed,BookOwner:"+username)
    .append("sortby","ExpectReturnTime")
    .append("order","asc")
    let seq = this.http.get(this.url+'book_transaction', { responseType: 'json' ,params:params});
    return seq;
  }
  getPostBooks(username:string){
    const params=new HttpParams()
    .append("query","BookStatus:post,BookOwner:"+username)
    .append("sortby","PostExpiration")
    .append("order","asc")
    let seq = this.http.get(this.url+'book_transaction', { responseType: 'json' ,params:params});
    return seq;
  }
  getRequestBooks(username:string){
    const params=new HttpParams()
    .append("query","BookStatus:request,BookBorrower:"+username)
    .append("sortby","PostExpiration")
    .append("order","asc")
    let seq = this.http.get(this.url+'book_transaction', { responseType: 'json' ,params:params});
    return seq;
  }
  sendMessageTo(message:MessageInfoModel){
    var params=JSON.stringify(message)
    let seq=this.http.post(this.url+'messger',params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
    return seq;
  }
  getBookById(bookid:string){
    let seq = this.http.get(this.url+'book_transaction/'+bookid, { responseType: 'json'});
    return seq;
  }
  updateBookById(bookid:string,book:BookInfoModel){
    var params=JSON.stringify(book)
   let seq=this.http.put(this.url+'book_transaction/'+bookid,params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
  getRecievedMessages(username:string){
    const params=new HttpParams()
    .append("query","IsDealed:false,Receiver:"+username)
    .append("sortby","SendingTime")
    .append("order","asc")
    let seq = this.http.get(this.url+'messger', { responseType: 'json' ,params:params});
    return seq;
  }
  updateMessageById(mid:string,msg:MessageWithIdModel){
    var params=JSON.stringify(msg)
   let seq=this.http.put(this.url+'messger/'+mid,params,{ headers: {'Content-Type':'application/x-www-form-urlencoded'}})
   return seq;
  }
}
