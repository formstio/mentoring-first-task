import {Injectable} from "@angular/core";
import {Todo} from "./todo.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class TodosApiService {
    private apiService = 'https://jsonplaceholder.typicode.com/todos';

    constructor(private http: HttpClient) {}

    getTodos(): Observable<Todo[]> {
        const todos = this.http.get<Todo[]>(this.apiService);
        return todos;
    }
}