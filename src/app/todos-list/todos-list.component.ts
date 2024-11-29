import {Component, OnInit} from "@angular/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "../users-list/user-card/user-card.component";
import {TodosService} from "./todos.service";
import {TodoCardComponent} from "./todos-card/todo-card.component";

@Component({
    selector: 'app-todos-list',
    templateUrl: './todos-list.component.html',
    styleUrls: ['./todos-list.component.scss'],
    standalone: true,
    imports: [
        AsyncPipe,
        NgForOf,
        UserCardComponent,
        TodoCardComponent
    ]
})

export class TodosListComponent implements OnInit {
    readonly todos$ = this.todosService.todos$

    constructor(
        private todosService: TodosService
    ) {}

    ngOnInit() {
        this.todosService.loadTodos()
    }

    onDeleteTodo(id: number) {
        this.todosService.deleteTodo(id)
    }
}