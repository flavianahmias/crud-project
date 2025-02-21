import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiService, Post } from './services/api.service';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { Comment } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, MatTableModule, TableComponent, CommonModule, CardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  posts: Post[] = [];
  initialPage = true;
  postSelected!: Post

  dataSource = new MatTableDataSource<Post>(this.posts);

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }
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

  view(post: Post) {
    this.initialPage = false


    this.api.getPostComments(post.id).subscribe({
      next: (d) => {
        post.comments = d
      },
      error: (e) => console.log(e),

    });

    this.postSelected = post

    console.log(this.postSelected)
  }

  onDeleteComment(comment: Comment) {
    //Remover comentario do post
    console.log(comment)
  }

  onEditComment(comment: Comment) {
    //Editar comentario
    console.log(comment)
  }

  onCreateComment() {
    // criar comentario
  }

  setInitialPage() {
    this.postSelected = {} as Post
    this.initialPage = !this.initialPage;
  }



}
