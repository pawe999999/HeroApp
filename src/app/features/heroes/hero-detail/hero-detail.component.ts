import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent {
  @Input() hero: any;
  selected: boolean = false;

  constructor() {}

  onSelect() {
    this.selected = true;
  }
}
