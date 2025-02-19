import { Component } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Article } from './article';
import { CommonModule } from '@angular/common';
import { PreviewPipe } from './preview.pipe';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blogs',
  imports: [CommonModule, PreviewPipe, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  
  articles: Article[] = []
  error: any
  constructor(private bs: BlogsService, private title: Title){}

  ngOnInit(){
    this.title.setTitle("Welcome to Blogs")
    this.bs.getArticles()
    .subscribe({
      next: (articles: Article[])=>this.articles=articles,
      error: (error)=>this.error=error
    })
  }
}
