import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserInfoModel,UserProfileInfoModel} from "../../models/models"
import {ServiceProvider} from "../../providers/service/service"
import {TabsPage} from "../../pages/tabs/tabs"
import {SignupPage} from "../../pages/signup/signup"
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public User: UserInfoModel
  public userProfile: UserProfileInfoModel
  public rootPage:any
  private username:string
  private pwd : string
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public service:ServiceProvider
    ) {
      this.User= new UserInfoModel
      this.userProfile=new UserProfileInfoModel
      this.rootPage=TabsPage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  magic(){
    this.navCtrl.setRoot(this.rootPage)
        this.navCtrl.popToRoot
  }
  login(){
   this.User.username=this.username
   this.User.pwd=this.pwd
   if(this.User.username!=""&&this.User.pwd!=""){
    this.service.login(this.User.username,this.User.pwd)
    .subscribe(data=>{
      console.log(data)
      if(data=="matched"){
        this.service.getUserProfile(this.User.username)
        .subscribe((res:any)=>{
          console.log(res)
          this.userProfile.Username=res.Username
          this.userProfile.Avatar=res.Avatar
          this.userProfile.Badge=res.Badge
          this.userProfile.BorrowCount=res.BorrowCount
          this.userProfile.Campus=res.Campus
          this.userProfile.Email=res.Email
          this.userProfile.EmailVerifyed=res.EmailVerifyed
          this.userProfile.LendCount=res.LendCount
          this.userProfile.Nickname=res.Nickname
          this.userProfile.PostCount=res.PostCount
          this.userProfile.Rank=res.rank
          this.userProfile.RequestCount=res.RequestCount
          this.userProfile.Score=res.Score
          this.userProfile.StudentId=res.StudentId
          localStorage.setItem("currentUser",this.userProfile.Username)
          localStorage.setItem("currentUserNickname",this.userProfile.Nickname)
          localStorage.setItem("currentUserRank",String(this.userProfile.Rank))
          localStorage.setItem("currentUserLends",String(this.userProfile.LendCount))
          localStorage.setItem("currentUserBorrows",String(this.userProfile.BorrowCount))
          localStorage.setItem("currentUserPosts",String(this.userProfile.PostCount))
          localStorage.setItem("currentUserAvator",this.userProfile.Avatar)
          localStorage.setItem("currentUserBadge",this.userProfile.Badge)
          localStorage.setItem("currentUserCampus",this.userProfile.Campus)
          localStorage.setItem("currentUserStudentId",this.userProfile.StudentId)
          localStorage.setItem("currentUserEmail",this.userProfile.Email)
          localStorage.setItem("currentUserEmailVerifyed",String(this.userProfile.EmailVerifyed))
        })
        this.navCtrl.setRoot(this.rootPage)
        this.navCtrl.popToRoot
    }else if (data=="not matched"){
      alert("Password not matched")
    }else if(data=="not exiested"){
      alert("no such a user")
    }else {
      alert("connection error")
    }
    },err=>{
      console.log(err.error)
    })
  }
  }
  gotoSignup(){
    this.navCtrl.push(SignupPage)
  }

}
