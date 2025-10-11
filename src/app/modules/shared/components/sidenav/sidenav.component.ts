import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  username: any;
  email: any;

  private keycloakService = inject(KeycloakService);

  menuNav = [
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorias", route: "category", icon: "category"},
    {name: "Produtos", route: "product", icon: "production_quantity_limits"},
  ]

constructor(media: MediaMatcher) {
  this.mobileQuery = media.matchMedia('(max-width: 600px)');
}

  ngOnInit(): void {
    // Initialization logic here
    this.username = this.keycloakService.getUsername();
    this.email = this.keycloakService.getKeycloakInstance().tokenParsed?.['email'];
  }
  logout(){
    this.keycloakService.logout();
  }
}
