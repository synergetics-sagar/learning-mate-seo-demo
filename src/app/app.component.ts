import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private meta: Meta){
    this.meta.updateTag({name: "description", content: "This App will help you to understand the Implementation and Benefits of SSR"})
  }
}
