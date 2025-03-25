import {Component, inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {User} from "../model/user.model";


@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        MatDialogClose,
    ]
})

export class EditUserDialogComponent {
    readonly data = inject<{user: User}>(MAT_DIALOG_DATA);

    public form = new FormGroup({
        name: new FormControl(this.data.user.name, [
            Validators.required,
            Validators.minLength(2)
        ]),
        email: new FormControl(this.data.user.email, [
            Validators.required,
            Validators.email
        ]),
        website: new FormControl(this.data.user.website, [
            Validators.required,
            Validators.minLength(3)
        ]),
        companyName: new FormControl(this.data.user.company.name, [
            Validators.required,
            Validators.minLength(2)
        ])
    });

    get userWithUpdatedFields() {
        return {
            ...this.form.value,
            id: this.data.user.id,
        }
    }
}