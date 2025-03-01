import {
  Component,
  inject,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface InputData {
  title: string;
  body: string;
  modalTitle: string;
}
@Component({
  selector: 'update-modal',
  templateUrl: 'update-modal.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class UpdateModalComponent {
  readonly dialogRef = inject(MatDialogRef<UpdateModalComponent>);
  readonly data = inject<InputData>(MAT_DIALOG_DATA);
  readonly title = model(this.data.title);
  readonly body = model(this.data.body);

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose() {
    return { ...this.data, title: this.title(), body: this.body() };
  }
}
