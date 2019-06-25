import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private logo = "assets/img/logo.png";

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogout(){
    this.authService.logout();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

}
