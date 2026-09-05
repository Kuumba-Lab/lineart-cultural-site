import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { PostModel } from '../../../models/post.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {

  post?: PostModel;
  isLoading = true;
  notFound = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly title: Title,
    private readonly meta: Meta,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.isLoading = true;
          this.notFound = false;
          return this.postService.findById(params.get('id') ?? '').pipe(
            catchError(() => of(undefined)),
            finalize(() => this.isLoading = false),
          );
        }),
      )
      .subscribe(post => {
        this.post = post;
        this.notFound = !post;
        if (post) {
          this.title.setTitle(`${post.title} | LINEART`);
          this.meta.updateTag({ name: 'description', content: this.excerpt(post) });
        }
      });
  }

  private excerpt(post: PostModel): string {
    const text = (post.content ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.slice(0, 160);
  }
}
