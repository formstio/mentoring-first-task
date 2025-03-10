import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { User } from "../model/user.model";
import { LocalStorageService } from "./localstorage.service";

const USERS_STORAGE_KEY = "users";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    private _users$ = new BehaviorSubject<User[]>(this.getUsersFromLocalStorage());
    readonly users$ = this._users$.asObservable();

    constructor(
        private usersApiService: UsersApiService,
        private localStorageService: LocalStorageService
    ) {}

    get users(): User[] {
        return this._users$.getValue();
    }

    set users(users: User[]) {
        this.localStorageService.setItem(USERS_STORAGE_KEY, users);
        this._users$.next(users);
    }

    private getUsersFromLocalStorage(): User[] {
        return this.localStorageService.getItem<User[]>(USERS_STORAGE_KEY) || [];
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    deleteUser(id: number): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    editUser(updatedUser: User): void {
        this.users = this.users.map(user => (user.id === updatedUser.id ? updatedUser : user));
    }

    loadUsers(): void {
        this.usersApiService.getUsers().subscribe(users => this.setUsers(users));
    }
}
