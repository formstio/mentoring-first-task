import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UsersApiService} from "./users-api.service";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})

export class UsersService {

    private usersSubject$ = new BehaviorSubject<User[]>([]); //создание приватного реактивного состояние
    public readonly users$ = this.usersSubject$.asObservable(); //отдаем на чтение поле users$

    constructor(private usersApiService: UsersApiService) {}

    deleteUser(id: number) {
        this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id)); //обращаемся к usersSubject, метод next перезапишет состояния, получаем доступ через velue и применяем filter
    }

    loadUsers(): void {
        this.usersApiService.getUsers().subscribe(
            (data: User[]) => {
                this.usersSubject$.next(data);
            }
        )
    }
}
