import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, DatePipe],
  template: `
    <footer>
      <div class="footer-content">
        <div class="logos">
          <img class="logos__utfpr" alt="Logo UTFPR" src="assets/img/utfpr.png">
          <img class="logos__mutec" alt="Logo MUTEC" src="assets/img/mutec_logo.png">
        </div>
        <address class ="info">
          <section class="location">
            <div class="location-main">
              <mat-icon aria-hidden="true" aria-label="Place icon" fontIcon="place"></mat-icon>
              <p aria-label="Endereço"> Rua Pedro Gusso, 2601 </p>
            </div>
            <p aria-label="CEP"> CEP: 81310-900   |   Neoville </p>
            <p aria-label="Cidade"> Curitiba - Paraná </p>
          </section>
          <section class ="contact">
            <div class="contact-container">
              <mat-icon aria-hidden="true" fontIcon="mail"></mat-icon>
              <p aria-label="E-mail">pelisson&#64;utfpr.edu.br</p>
            </div>
            <div class="contact-container">
              <mat-icon aria-hidden="true" fontIcon="local_phone"></mat-icon>
              <p aria-label="Telefone">(41) 3310-4742</p>
            </div>
            <div class="contact-container">
              <a href="https://wa.me/5541999159395" target=”_blank” aria-label="Whatsapp">
                <mat-icon aria-hidden="true" fontIcon="sms"></mat-icon>
                <p aria-label="Celular"> (41) 99915-9395 </p>
              </a>
            </div>
          </section>
        </address>
      </div>
      <div class="footer-copyright">
        <p> ©{{currentDate | date: 'yyyy'}} - MUTEC | Museu de Tecnologias da UTFPR </p>
      </div>
    </footer>
  `,
  styleUrls: ['footer.component.css'],
})
export class FooterComponent {
  protected currentDate = new Date();
}
