import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private meta: Meta, @Inject(DOCUMENT) private document: Document){
    this.meta.updateTag({name: "description", content: "This App will help you to understand the Implementation and Benefits of SSR"})
  }

}
