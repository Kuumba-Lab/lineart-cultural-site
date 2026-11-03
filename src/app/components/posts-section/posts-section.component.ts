import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterRender, Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './posts-section.component.html',
})
export class PostsSectionComponent {

  posts: PostModel[] = [];
  isLoading = false;
  hasError = false;

  constructor(
    private readonly postService: PostService,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) {
    afterRender(() => this.load());
  }

  private load(): void {
    if (!isPlatformBrowser(this.platformId) || this.isLoading || this.posts.length) {
      return;
    }

    this.isLoading = true;
    this.postService.findPaged({ page: 1, size: 4 })
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.posts = res.content ?? [];
          this.isLoading = false;
        },
        error: () => {
          this.hasError = true;
          this.isLoading = false;
        }
      });
  }

  excerpt(post: PostModel): string {
    const text = (post.content ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > 140 ? `${text.slice(0, 140)}…` : text;
  }

  authorsLabel(post: PostModel): string {
    return (post.authors ?? []).map(a => a.name).join(', ');
  }
}
