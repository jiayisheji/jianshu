import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../../core/authorization';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private search: string;
  private isLogin: boolean;
  constructor(private route : ActivatedRoute, private router: Router, private authorizationService: AuthorizationService) { }
  ngOnInit() {
    this.search = this.route.snapshot.queryParams.q;
    this.isLogin = this.authorizationService.isLogin();
  }
  searchHandler(){
    this.router.navigate(['/search'],{queryParams : {q : this.search}});
    return false;
  }
}
