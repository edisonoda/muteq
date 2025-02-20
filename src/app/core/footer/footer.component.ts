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
              <p> Rua Pedro Gusso, 2601 </p>
            </div>
            <p> CEP: 81310-900   |   Neoville </p>
            <p> Curitiba - Paraná </p>
          </section>
          <section class ="contact">
            <div class="contact-container">
              <a href="mailto:pelisson&#64;utfpr.edu.br" target=”_blank” aria-labelledby="email-footer">
                <label id="email-footer" class="d-none">Mandar e-mail (abre nova janela)</label>
                <mat-icon aria-hidden="true" fontIcon="mail"></mat-icon>
                <p>pelisson&#64;utfpr.edu.br</p>
              </a>
            </div>
            <div class="contact-container">
              <a href="tel:+554133104742" target=”_blank” aria-labelledby="phone-footer">
                <label id="phone-footer" class="d-none">Ligar (abre nova janela)</label>
                <mat-icon aria-hidden="true" fontIcon="local_phone"></mat-icon>
                <p> (41) 99915-9395 </p>
              </a>
            </div>
            <div class="contact-container">
              <a href="https://wa.me/5541999159395" target=”_blank” aria-labelledby="whatsapp-footer">
                <label id="whatsapp-footer" class="d-none">Mandar uma mensagem no WhatsApp (abre nova janela)</label>
                <mat-icon aria-hidden="true" fontIcon="sms"></mat-icon>
                <p> (41) 99915-9395 </p>
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
