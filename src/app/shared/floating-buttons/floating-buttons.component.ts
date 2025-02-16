import { Component } from "@angular/core";
import { HelpButtonComponent } from "../help/help.component";
import { QRCodeReaderButtonComponent } from "../qrcode-reader/qrcode-reader-button.component";

@Component({
    selector: 'app-floating-buttons',
    imports: [HelpButtonComponent, QRCodeReaderButtonComponent],
    template: `
        <div class="floating-buttons">
            <app-help-button></app-help-button>
            <app-qrcode-reader-button></app-qrcode-reader-button>
        </div>
    `,
    styles: `
        .floating-buttons {
            position: fixed;

            bottom: 15px;
            right: 15px;

            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .floating-buttons > *:has(~*) {
            margin-bottom: 10px;
        }
    `
})
export class FloatingButtonsComponent { }