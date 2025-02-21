import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/api.service';
import { Comment } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-card',
  imports: [
    RouterModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() post!: Post;

  @Output() deleteComment = new EventEmitter<Comment>();
  @Output() editComment = new EventEmitter<Comment>();

  @Output() createComment = new EventEmitter<Comment>();

  title: string = '';
  body: string = '';

  readonly modal = inject(MatDialog);

  onDeleteComment(comment: Comment) {
    const modal = this.modal.open(DeleteModalComponent, {
      data: { ...comment, modalTitle: 'comentário' },
    });

    modal.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteComment.emit(comment);
      }
    });
  }

  onEditComment(comment: Comment) {
    const modal = this.modal.open(UpdateModalComponent, {
      data: { ...comment, title: comment.name, modalTitle: 'comentário' },
    });

    modal.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.editComment.emit({ ...result, name: result.title });
      }
    });
  }

  onCreateComment() {
    this.createComment.emit({
      postId: this.post.id,
      name: this.title,
      body: this.body,
    });
    this.body = '';
    this.title = '';
  }
}
