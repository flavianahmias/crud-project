import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  model,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../services/api.service';
import { DeletePostModal } from '../delete-post-modal/delete-post-modal.component';
import { UpdatePostModal } from '../update-post-modal/update-post-modal.component';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Output() editPost = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<Post>();
  @Input() data: Post[] = [];

  displayedColumns: string[] = ['id', 'title', 'body', 'comments', 'actions'];
  readonly modal = inject(MatDialog);

  dataSource!: MatTableDataSource<Post>;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  openDeleteModal(postToDelete: Post) {
    const modal = this.modal.open(DeletePostModal, {
      data: { ...postToDelete },
    });

    modal.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost.emit(postToDelete);
      }
    });
  }

  openEditModal(postToEdit: Post) {
    const modal = this.modal.open(UpdatePostModal, {
      data: postToEdit,
    });

    modal.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.editPost.emit(result);
      }
    });
  }
}
