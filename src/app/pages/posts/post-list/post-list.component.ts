import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { finalize, take } from 'rxjs';
import { PostService } from '../../../services/post.service';
import { AuthorModel, PagedModel, PostFilters, PostModel, TagModel } from '../../../models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit {

  readonly pageSize = 9;

  filters: PostFilters = { page: 1, size: this.pageSize, searchTerm: '', tag: '', author: '' };
  paged: PagedModel<PostModel> = { content: [], count: 0, page: 1, size: this.pageSize };
  tags: TagModel[] = [];
  authors: AuthorModel[] = [];
  isLoading = false;
  hasError = false;

  constructor(
    private readonly postService: PostService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filters = {
        page: Math.max(1, Number(params.get('pagina')) || 1),
        size: this.pageSize,
        searchTerm: params.get('busca') ?? '',
        tag: params.get('tag') ?? '',
        author: params.get('autor') ?? '',
      };
      this.load();
    });

    this.postService.findTags().pipe(take(1)).subscribe({ next: tags => this.tags = tags, error: () => this.tags = [] });
    this.postService.findAuthors().pipe(take(1)).subscribe({ next: authors => this.authors = authors, error: () => this.authors = [] });
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.paged.count / this.pageSize));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get hasFilters(): boolean {
    return Boolean(this.filters.searchTerm || this.filters.tag || this.filters.author);
  }

  search(): void {
    this.navigate({ ...this.filters, page: 1 });
  }

  selectTag(tag: string): void {
    this.navigate({ ...this.filters, tag: this.filters.tag === tag ? '' : tag, page: 1 });
  }

  selectAuthor(author: string): void {
    this.navigate({ ...this.filters, author: this.filters.author === author ? '' : author, page: 1 });
  }

  clearFilters(): void {
    this.navigate({ page: 1, size: this.pageSize, searchTerm: '', tag: '', author: '' });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.filters.page) return;
    this.navigate({ ...this.filters, page });
  }

  authorsLabel(post: PostModel): string {
    return (post.authors ?? []).map(a => a.name).join(', ');
  }

  excerpt(post: PostModel): string {
    const text = (post.content ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length > 160 ? `${text.slice(0, 160)}…` : text;
  }

  private navigate(filters: PostFilters): void {
    this.router.navigate(['/publicacoes'], {
      queryParams: {
        busca: filters.searchTerm || null,
        tag: filters.tag || null,
        autor: filters.author || null,
        pagina: filters.page > 1 ? filters.page : null,
      },
    });
  }

  private load(): void {
    this.isLoading = true;
    this.hasError = false;
    this.postService.findPaged(this.filters)
      .pipe(
        take(1),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: res => this.paged = res,
        error: () => {
          this.hasError = true;
          this.paged = { content: [], count: 0, page: 1, size: this.pageSize };
        }
      });
  }
}
