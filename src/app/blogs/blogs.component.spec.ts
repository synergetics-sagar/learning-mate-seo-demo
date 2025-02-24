import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogsComponent } from './blogs.component';
import { BlogsService } from './blogs.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Article } from './article';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;
  let blogsService: BlogsService;
  let titleService: Title;

  // Mock Data
  const mockArticles: Article[] = [
    { id: '1', title: 'Article 1', content: 'Content 1', image: 'image1.jpg' },
    { id: '2', title: 'Article 2', content: 'Content 2', image: 'image2.jpg' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsComponent], // Import standalone component
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BlogsService,
        Title,
        { provide: ActivatedRoute, useValue: {} } // ✅ Mock ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    blogsService = TestBed.inject(BlogsService);
    titleService = TestBed.inject(Title);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch articles on init and update the articles list', () => {
    spyOn(blogsService, 'getArticles').and.returnValue(of(mockArticles));

    component.ngOnInit();

    expect(component.articles.length).toBe(2);
    expect(component.articles[0].title).toBe('Article 1');
  });

  it('should handle error when API call fails', () => {
    spyOn(blogsService, 'getArticles').and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();

    expect(component.error).toBeTruthy();
  });

  it('should set the page title on init', () => {
    spyOn(titleService, 'setTitle');

    component.ngOnInit();

    expect(titleService.setTitle).toHaveBeenCalledWith('Welcome to Blogs');
  });

  it('should display error message if API fails', () => {
    spyOn(blogsService, 'getArticles').and.returnValue(throwError(() => new Error('API Error')));

    component.ngOnInit();
    fixture.detectChanges(); // Update the UI

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('div')?.textContent).toContain('Problem while fetching Articles');
  });

  it('should display articles in the template', () => {
    spyOn(blogsService, 'getArticles').and.returnValue(of(mockArticles));

    component.ngOnInit();
    fixture.detectChanges(); // Update the UI

    const compiled = fixture.nativeElement as HTMLElement;
    const articleElements = compiled.querySelectorAll('.article_thumbnail');

    expect(articleElements.length).toBe(2);
    expect(articleElements[0].querySelector('h5')?.textContent).toContain('Article 1');
  });
});
