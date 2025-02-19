import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
    constructor(private meta: Meta, private title: Title){
      this.title.setTitle("Welcome to About Page")
      this.meta.updateTag({name: "description", content: "Angular is a development platform, built on TypeScript"})
    }
}
