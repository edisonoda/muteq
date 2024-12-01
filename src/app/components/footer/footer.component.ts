import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, DatePipe],
  template: `
  <footer>
      <div class="footer-content">
        <div class="logos">
          <img class="logos__utfpr" src="assets/img/utfpr.png" >
          <img class="logos__mutec" src="assets/img/mutec_logo.png">
        </div>
        <div class ="info">
            <div class="location">
                <div class="location-main">
                    <mat-icon aria-hidden="true" aria-label="Place icon" fontIcon="place"></mat-icon>
                    <p> Rua Pedro Gusso, 2601 </p>
                </div>
                <p> CEP: 81310-900   |   Neoville </p>
                <p> Curitiba - Paraná </p>
            </div>
            <div class ="contact">
                <div class="contact-container">
                    <mat-icon aria-hidden="false" aria-label="Email contact icon" fontIcon="mail"></mat-icon>
                    <p>pelisson&#64;utfpr.edu.br</p>
                </div>
                <div class="contact-container">
                    <mat-icon aria-hidden="false" aria-label="Phone contact icon" fontIcon="local_phone"></mat-icon>
                    <p>41 3310-4742</p>
                </div>
                <div class="contact-container">
                    <a href="https://wa.me/5541999159395" target=”_blank”>
                        <mat-icon aria-hidden="false" aria-label="Whatsapp contact icon" fontIcon="sms"></mat-icon>
                        <p> 41 99915-9395 </p>
                    </a>
                </div>
            </div>
        </div>
      </div>
      <div class="footer-copyright">
        <p> ©{{currentDate | date: 'yyyy'}} - MUTEC | Museu de Tecnologias da UTFPR </p>
      </div>
  </footer>

  `,
  styleUrls: ['footer.component.css'],
})
export class FooterComponent {
    protected currentDate= new Date();
}
