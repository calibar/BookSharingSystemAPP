import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UserInfoModel} from "../../models/userInfo"
import {ServiceProvider} from "../../providers/service/service"
import {TabsPage} from '../../pages/tabs/tabs'
import { UserProfileInfoModel } from '../../models/models';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public User: UserInfoModel
  public ConfirmPWD:string
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public service:ServiceProvider) {
      this.User= new UserInfoModel
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  signup(){
    if(this.User.username!=""&&this.User.pwd!=""){
      if(this.User.pwd==this.ConfirmPWD){
        this.service.signup(this.User)
        .subscribe(data=>{
          console.log(data)
          if(data==this.User.username){
              let userProfile=new UserProfileInfoModel
              userProfile.Username=this.User.username
              userProfile.Email=this.User.email
              this.service.postUserProfile(userProfile).subscribe((res:any)=>{
                      if (res.Username==this.User.username) {
                        userProfile.Username=res.Username
                        userProfile.Avatar=res.Avatar
                        userProfile.Badge=res.Badge
                        userProfile.BorrowCount=res.BorrowCount
                        userProfile.Campus=res.Campus
                        userProfile.Email=res.Email
                        userProfile.EmailVerifyed=res.EmailVerifyed
                        userProfile.LendCount=res.LendCount
                        userProfile.Nickname=res.Nickname
                        userProfile.PostCount=res.PostCount
                        userProfile.Rank=res.rank
                        userProfile.RequestCount=res.RequestCount
                        userProfile.Score=res.Score
                        userProfile.StudentId=res.StudentId
                        localStorage.setItem("currentUser",userProfile.Username)
                        localStorage.setItem("currentUserNickname",userProfile.Nickname)
                        localStorage.setItem("currentUserRank",String(userProfile.Rank))
                        localStorage.setItem("currentUserLends",String(userProfile.LendCount))
                        localStorage.setItem("currentUserBorrows",String(userProfile.BorrowCount))
                        localStorage.setItem("currentUserPosts",String(userProfile.PostCount))
                        localStorage.setItem("currentUserAvator",userProfile.Avatar)
                        localStorage.setItem("currentUserBadge",userProfile.Badge)
                        localStorage.setItem("currentUserCampus",userProfile.Campus)
                        localStorage.setItem("currentUserStudentId",userProfile.StudentId)
                        localStorage.setItem("currentUserEmail",userProfile.Email)
                        localStorage.setItem("currentUserEmailVerifyed",String(userProfile.EmailVerifyed))
                        this.navCtrl.setRoot(TabsPage)
                        this.navCtrl.popToRoot
                      }else{
                        alert("connection error")
                      }
              },err=>{
                console.log(err)
              })
              
          }else if (data=="existed"){
            alert("username has already existed")
          }
        },err=>{
          console.log(err.error)
        })
      }else{
        alert("Password and Confirm Password are not matched, Please check again.")
      }
          
        /* .subscribe((resp) => {
            console.log("hello");
            alert(resp)
            //this.img.ID=uuid;
           
            
          }, (err) => {
            
            console.log(err);
          });*/
    }else{
      alert("Username and Password cannot be null.")
    }
  }
}