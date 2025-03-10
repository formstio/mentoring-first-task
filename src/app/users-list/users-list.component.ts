import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "./service/users.service";



@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true,
    imports: [UserCardComponent, CommonModule],
})

export class UsersListComponent implements OnInit{

    public readonly users$ = this.usersService.users$

    constructor(
        private usersService: UsersService
    ) {}

    ngOnInit(): void {
        const usersFromStorage = this.usersService.users;

        if (usersFromStorage.length) {
            this.usersService.setUsers(usersFromStorage);
        } else {
            this.usersService.loadUsers();
        }
    }


    onDeleteUser(id: number) {
        this.usersService.deleteUser(id);
    }

    onEditUser(user: any) {
        this.usersService.editUser({
            ...user,
            company: {
                name: user.companyName,
            }
        });
    }
}