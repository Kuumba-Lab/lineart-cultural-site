import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { PostModel } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {

  post?: PostModel;
  isLoading = false;
  notFound = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.isLoading = true;
    this.route.params
      .pipe(
        take(1),
        switchMap(params => this.postService.findById(params['id']))
      )
      .subscribe({
        next: (post) => {
          this.post = post;
          this.isLoading = false;
        },
        error: () => {
          this.notFound = true;
          this.isLoading = false;
        }
      });
  }

  authorsLabel(): string {
    return (this.post?.authors ?? []).map(a => a.name).join(', ');
  }
}
