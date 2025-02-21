import {
    Component,
    EventEmitter,
    inject,
    Input,
    model,
    Output,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Post } from '../../services/api.service';
import { Comment } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeletePostModal } from '../delete-post-modal/delete-post-modal.component';
import { UpdatePostModal } from '../update-modal/update-modal.component';

@Component({
    selector: 'app-card',
    imports: [RouterModule, RouterOutlet, MatTableModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDialogModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    @Input() post!: Post


    @Output() deleteComment = new EventEmitter<Comment>()
    @Output() editComment = new EventEmitter<Comment>()

    @Output() createComment = new EventEmitter<Comment>()


    title: string = ''
    body: string = ''


    readonly modal = inject(MatDialog);

    onDeleteComment(comment: Comment) {
        const modal = this.modal.open(DeletePostModal, {
            data: { ...comment },
        });

        modal.afterClosed().subscribe((result) => {
            if (result) {
                this.deleteComment.emit(comment);
            }
        });
    }

    onEditComment(comment: Comment) {
        const modal = this.modal.open(UpdatePostModal, {
            data: { ...comment, title: comment.name, modalTitle: 'comentário' },
        });

        modal.afterClosed().subscribe((result) => {
            if (result !== undefined) {
                this.editComment.emit({ ...result, name: result.title });
            }
        });
    }

    onCreateComment() {
        console.log({
            title: this.title, body: this.body
        })
        this.createComment.emit()
    }



}
