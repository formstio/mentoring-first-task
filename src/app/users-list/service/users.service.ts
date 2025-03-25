import {Inject, Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { User } from "../model/user.model";
import { LocalStorageService } from "./localstorage.service";

const USERS_STORAGE_KEY = "users";

@Injectable({
    providedIn: "root",
})
export class UsersService {
    private usersSubject$ = new BehaviorSubject<User[]>(this.getUsersFromLocalStorage());
    readonly users$ = this.usersSubject$.asObservable();

    constructor(
        @Inject(UsersApiService) private usersApiService: UsersApiService,
        @Inject(LocalStorageService) private localStorageService: LocalStorageService
    ) {}

    get users(): User[] {
        return this.usersSubject$.getValue();
    }

    set users(users: User[]) {
        this.localStorageService.setItem(USERS_STORAGE_KEY, users);
        this.usersSubject$.next(users);
    }

    private getUsersFromLocalStorage(): User[] {
        return this.localStorageService.getItem<User[]>(USERS_STORAGE_KEY) || [];
    }

    setUsers(users: User[]): void {
        this.users = users;
    }

    addUser(newUser: User): void {
        const newUserId = this.users.length ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
        const userWithId = { ...newUser, id: newUserId };

        const updatedUsers = [...this.users, userWithId];
        this.setUsers(updatedUsers);
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
