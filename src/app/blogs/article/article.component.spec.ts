import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { BlogsService } from '../blogs.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Article } from '../article';
import { Title, Meta } from '@angular/platform-browser';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let blogsService: BlogsService;
  let titleService: Title;
  let metaService: Meta;

  // Mock article data
  const mockArticle: Article = {
    id: '1',
    title: 'Mock Article Title',
    content: 'This is a mock content.',
    image: 'mock-image.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleComponent], // Import standalone component
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BlogsService,
        Title,
        Meta,
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } } // ✅ Mock ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    blogsService = TestBed.inject(BlogsService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch article data on init and update properties', () => {
    spyOn(blogsService, 'getArticleContent').and.returnValue(of(mockArticle));

    component.ngOnInit();

    expect(component.article.title).toBe('Mock Article Title');
    expect(component.article.content).toBe('This is a mock content.');
    expect(component.article.image).toBe('mock-image.jpg');
  });

  it('should update page title and meta tags on article fetch', () => {
    spyOn(blogsService, 'getArticleContent').and.returnValue(of(mockArticle));
    spyOn(titleService, 'setTitle');
    spyOn(metaService, 'updateTag');

    component.ngOnInit();

    expect(titleService.setTitle).toHaveBeenCalledWith('Mock Article Title');
    expect(metaService.updateTag).toHaveBeenCalledWith({ property: 'og:title', content: 'Mock Article Title' });
    expect(metaService.updateTag).toHaveBeenCalledWith({ property: 'og:description', content: 'This is a mock content.'.substring(0, 150) });
    expect(metaService.updateTag).toHaveBeenCalledWith({ property: 'og:image', content: 'mock-image.jpg' });
  });

  it('should handle API errors and set error property', () => {
    spyOn(blogsService, 'getArticleContent').and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(component.error).toBeTruthy();
  });

  it('should display an error message when API fails', () => {
    spyOn(blogsService, 'getArticleContent').and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    fixture.detectChanges(); // Update UI

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('Problem while fetching Articles');
  });

  it('should display article title and content in the template', () => {
    spyOn(blogsService, 'getArticleContent').and.returnValue(of(mockArticle));

    component.ngOnInit();
    fixture.detectChanges(); // Update UI

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('Mock Article Title');
    expect(compiled.querySelector('p')?.textContent).toContain('This is a mock content.');
  });
});
