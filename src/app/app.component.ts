import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService, Post } from './services/api.service';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTableModule, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  posts: Post[] = [];

  dataSource = new MatTableDataSource<Post>(this.posts);

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getPosts().subscribe({
      next: (d) => {
        this.posts = d;
        this.dataSource.data = this.posts;
      },
      error: (e) => console.log(e),
    });
  }

  //Não ta atualizando a lista
  onDelete(postToDelete: Post) {
    this.dataSource.data = this.dataSource.data.filter(
      (post) => post.id !== postToDelete.id
    );

    this.cdr.markForCheck();
  }

  onEdit(postToEdit: Post) {
    const postIndex = this.posts.findIndex((p) => p.id === postToEdit.id);
    this.posts[postIndex].body = postToEdit.body;
    this.posts[postIndex].title = postToEdit.title;
    this.dataSource.data = [...this.posts];
    this.cdr.markForCheck();
  }
}
