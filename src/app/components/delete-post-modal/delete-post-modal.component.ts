import {
  Component,
  ChangeDetectionStrategy,
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
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Post } from '../../services/api.service';

export interface InputData {
  post?: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  type: 'post' | 'comment'
}


@Component({
  selector: 'delete-post-modal',
  templateUrl: 'delete-post-modal.html',
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
export class DeletePostModal {
  readonly dialogRef = inject(MatDialogRef<DeletePostModal>);
  readonly data = inject<InputData>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
