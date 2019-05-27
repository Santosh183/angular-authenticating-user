import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
            this.userFromApi = user;
        });
    }
}
