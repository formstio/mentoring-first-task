import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {TodosApiService} from "./todos-api.service";
import {Todo} from "./todo.model";

@Injectable({
    providedIn: 'root'
})

export class TodosService {
    private todosSubject$ = new BehaviorSubject<Todo[]>([])
    public readonly todos$ = this.todosSubject$.asObservable()

    constructor(private todosApiService: TodosApiService) {}

    deleteTodo(id: number) {
        this.todosSubject$.next(this.todosSubject$.value.filter(todo => todo.id !== id));
    }

    loadTodos(): void {
        this.todosApiService.getTodos().subscribe(
            (data: Todo[]) => {
                this.todosSubject$.next(data);
            }
        )
    }
}