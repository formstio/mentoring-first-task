import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersService } from "./service/users.service";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { CreateUserFormComponent } from "./create-user-form/create-user-form.component";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    standalone: true,
    imports: [
        UserCardComponent,
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        CreateUserFormComponent
    ],
})
export class UsersListComponent implements OnInit {
    public readonly users$ = this.usersService.users$;
    public isFormVisible = false;

    constructor(
        private usersService: UsersService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        const usersFromStorage = this.usersService.users;
        if (usersFromStorage.length) {
            this.usersService.setUsers(usersFromStorage);
        } else {
            this.usersService.loadUsers();
        }
    }

    toggleForm() {
        this.isFormVisible = !this.isFormVisible;
    }

    onUserCreated(user: any) {
        console.log('Добавлен новый пользователь:', user);
        this.usersService.addUser(user);
        this.isFormVisible = false;
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
