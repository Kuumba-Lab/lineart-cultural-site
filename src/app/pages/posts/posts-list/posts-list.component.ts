import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { PagedModel, PostModel } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {

  paged: PagedModel<PostModel> = { content: [], count: 0, page: 1, size: 12 };
  page = 1;
  size = 12;
  searchTerm = '';
  isLoading = false;
  hasError = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private readonly platformId: any,
  ) { }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.route.queryParams
      .pipe(take(1))
      .subscribe(params => {
        this.searchTerm = params['searchTerm'] ?? '';
        this.page = Number(params['page']) || 1;
        this.load();
      });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.paged.count / this.size));
  }

  search(): void {
    this.router.navigate(['/publicacoes'], {
      queryParams: { searchTerm: this.searchTerm || undefined, page: 1 }
    }).then(() => {
      this.page = 1;
      this.load();
    });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return;
    }
    this.page = page;
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.hasError = false;

    const params: Record<string, string | number> = { page: this.page, size: this.size };
    if (this.searchTerm.trim()) {
      params['searchTerm'] = this.searchTerm.trim();
    }

    this.postService.findPaged(params)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.paged = res;
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
