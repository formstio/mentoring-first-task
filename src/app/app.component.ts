import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CreateUserFormComponent} from "./users-list/create-user-form/create-user-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, CreateUserFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-first-project';
}
