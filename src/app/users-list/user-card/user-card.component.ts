import {Component, EventEmitter, Input, Output} from "@angular/core";
// @ts-ignore
import {User} from "../user.model";

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    imports: [],
    standalone: true
})

export class UserCardComponent {

    @Input({required: true}) user!: User;

    @Output() deleteUser = new EventEmitter<number>();

    onDeleteUser() {
        this.deleteUser.emit(this.user.id);
    }
}