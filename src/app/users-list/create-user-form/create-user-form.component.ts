import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {from} from "rxjs";

@Component({
    selector: 'app-create-user-form',
    templateUrl: './create-user-form.component.html',
    styleUrls: ['./create-user-form.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
})

export class CreateUserFormComponent {
   @Output()
   createUser = new EventEmitter();

   public form = new FormGroup({
       name: new FormControl('', [
           Validators.required,
           Validators.minLength(2)
       ]),
       email: new FormControl('', [
           Validators.required,
           Validators.email
       ]),
       website: new FormControl('', [
           Validators.required,
           Validators.minLength(3)
       ]),
       company: new FormControl('', [
           Validators.required,
           Validators.minLength(2)
       ]),
       companyName: new FormControl('', [
           Validators.required,
           Validators.minLength(2)
       ]),
   });

   public submitForm() {
       if (this.form.valid) {
           this.createUser.emit(this.form.value);
       }
   }
}