import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})

export class UsersApiService {
    private apiService = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        const users = this.http.get<User[]>(this.apiService);
        return users;
    }
}