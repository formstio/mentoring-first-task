import {Component, EventEmitter, Input, Output} from "@angular/core";
// @ts-ignore
import {Todo} from "../model/todo.model";

@Component({
    selector: 'app-todo-card',
    templateUrl: './todo-card.component.html',
    styleUrls: ['./todo-card.component.scss'],
    standalone: true,
    imports: []
})

export class TodoCardComponent {

    @Input({required: true}) todo!: Todo;

    @Output() deleteTodo = new EventEmitter<number>();

    onDeleteTodo() {
        this.deleteTodo.emit(this.todo.id);
    }
}