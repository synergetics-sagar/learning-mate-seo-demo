import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { Article } from '../article';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  imports: [CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {

  article: Article ={
    id: '',
    title: 'Loading Title...',
    content: 'Loading Content...',
    image: ''
  }
  error: any
  constructor(private ar:ActivatedRoute, private bs: BlogsService, private meta: Meta, private title: Title){}

  ngOnInit(){
    let id = this.ar.snapshot.params['id']
    this.bs.getArticleContent(id)
    .subscribe({
      next: (article: Article)=>{
        this.article=article
        this.title.setTitle(this.article.title)
        this.meta.updateTag({property: "og:title", content: this.article.title})
        this.meta.updateTag({property: "og:description", content: this.article.content.substring(0, 150)})
        this.meta.updateTag({property: "og:image", content: this.article.image})
      },
      error: (error:any)=>this.error=error
    })
  }
}
