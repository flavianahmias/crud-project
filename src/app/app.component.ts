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
  imports: [
    RouterModule,
    RouterOutlet,
    MatTableModule,
    TableComponent,
    CommonModule,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  posts: Post[] = [];
  dataSource = new MatTableDataSource<Post>(this.posts);

  initialPage = true;
  postSelected!: Post;

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

  onDelete(postToDelete: Post) {
    this.api.deletePost(postToDelete).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id !== postToDelete.id);
      },
      error: (e) => console.log(e),
    });
  }

  onEdit(postToEdit: Post) {
    this.api.updatePost(postToEdit).subscribe({
      next: () => {
        const postIndex = this.posts.findIndex((p) => p.id === postToEdit.id);
        this.posts[postIndex].body = postToEdit.body;
        this.posts[postIndex].title = postToEdit.title;
      },
      error: (e) => console.log(e),
    });
  }

  onView(post: Post) {
    this.initialPage = false;

    if (post.comments === undefined) {
      this.api.getPostComments(post.id).subscribe({
        next: (res) => (post.comments = res),
        error: (e) => console.log(e),
      });
    }

    this.postSelected = post;
  }

  onDeleteComment(comment: Comment) {
    const postIndex = this.posts.findIndex((p) => p.id === comment.postId);
    const post = this.posts[postIndex];

    this.posts[postIndex].comments = post.comments
      ? post.comments.filter((p) => p.id !== comment.id)
      : [];
  }

  onEditComment(comment: Comment) {
    const postIndex = this.posts.findIndex((p) => p.id === comment.postId);

    if (postIndex >= 0) {
      const postComments = this.posts[postIndex].comments || [];

      const commentIndex = postComments.findIndex((p) => p.id === comment.id);
      this.posts[postIndex].comments![commentIndex] = {
        ...comment,
      };
    }
  }

  onCreateComment(comment: Comment) {
    const postIndex = this.posts.findIndex((p) => p.id === comment.postId);

    if (this.posts[postIndex].comments !== undefined) {
      this.posts[postIndex].comments.push({
        body: comment.body,
        name: comment.name,
        postId: comment.postId,
      });
    }
  }

  setInitialPage() {
    this.postSelected = {} as Post;
    this.initialPage = !this.initialPage;
  }
}
