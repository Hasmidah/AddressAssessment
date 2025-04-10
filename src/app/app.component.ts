import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'AddressProject';


  private readonly primeng = inject(PrimeNG);

  YearDisplay: string = new Date().getFullYear().toString();

  ngOnInit() {
    this.primeng.ripple.set(true);
  }


}
