import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../../services/api.service';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Output() editPost = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<Post>();
  @Output() viewPost = new EventEmitter<Post>();
  @Input() data: Post[] = [];

  displayedColumns: string[] = ['id', 'title', 'body', 'actions'];
  readonly modal = inject(MatDialog);

  dataSource!: MatTableDataSource<Post>;
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  openDeleteModal(postToDelete: Post) {
    const modal = this.modal.open(DeleteModalComponent, {
      data: { ...postToDelete, modalTitle: 'post' },
    });

    modal.afterClosed().subscribe((result) => {
      if (result) {
        this.deletePost.emit(postToDelete);
      }
    });
  }

  openEditModal(postToEdit: Post) {
    const modal = this.modal.open(UpdateModalComponent, {
      data: { ...postToEdit, modalTitle: 'post' },
    });

    modal.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.editPost.emit(result);
      }
    });
  }

  openPostDetails(post: Post) {
    this.viewPost.emit(post);
  }
}
