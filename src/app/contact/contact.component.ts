import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
      constructor(private meta: Meta, private title: Title){
        this.title.setTitle("Welcome to Contact Page")
        this.meta.updateTag({name: "description", content: "Stay Connected On"})
      }
}
