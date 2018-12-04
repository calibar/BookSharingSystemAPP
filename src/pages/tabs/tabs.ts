import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { BorrowPage} from '../../pages/borrow/borrow'
import { LendPage} from '../../pages/lend/lend'
import { PostPage} from '../../pages/post/post'
import {RequestPage} from '../../pages/request/request'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LendPage;
  tab3Root = BorrowPage;
  tab4Root = PostPage;
  tab5Root = RequestPage;

  constructor() {

  }
}
