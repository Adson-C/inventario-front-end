import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keycloakService: KeycloakService) { }

  getRoles() {
    return this.keycloakService.getUserRoles();
  }

  isAdmin() {
    const roles = this.keycloakService.getUserRoles().filter(r => r === 'admim');

    if (roles && roles.length > 0) {
      return true;
    }

    return false;
  }
}
