import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor( private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    this.router.navigate(['/admin'], { relativeTo: this.route });
  }
}
