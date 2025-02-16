import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AdmService } from "src/app/services/adm.service";
import { listLoadAnimation } from "src/app/utils/animations/list-load.animation";

@Component({
  selector: 'app-file-uploader',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  animations: [listLoadAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @ViewChild('fileInput')
  private _input!: ElementRef;

  @Input()
  public control: FormControl = new FormControl();

  private _path: string | undefined;
  public get path() { return this._path; }
  @Input()
  public set path(p: string | undefined) {
    this._path = p;
    this.cdr.detectChanges();
  }

  private _multiple: boolean = false;
  public get multiple() { return this._multiple; }
  @Input()
  public set multiple(m: boolean) {
    this._multiple = m;
    this.cdr.detectChanges();
  }

  private _files: Array<string> = [];
  public get files() { return this._files; }

  private _uploadedFiles: Array<string> = [];
  public get uploadedFiles() { return this._uploadedFiles; }

  constructor(private cdr: ChangeDetectorRef, private admService: AdmService) { }

  public onFileSelected(): void {
    const inputNode: HTMLInputElement = this._input.nativeElement;

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const file = e.target?.result;

        if (!this.multiple)
          this._files = [];

        if (file && typeof file === 'string')
          this._files.push(file);

        inputNode.value = "";
        this.cdr.detectChanges();
      };

      if (inputNode.files) {
        reader.readAsDataURL(inputNode.files[0]);
        this.uploadeFile(inputNode.files[0]);
      }
    }
  }

  public removeImage(index: number): void {
    this._files.splice(index, 1);
    this._uploadedFiles.splice(index, 1);

    if (this.multiple)
      this.control.setValue(this._uploadedFiles);
    else
      this.control.setValue(null);

    this.cdr.detectChanges();
  }

  private uploadeFile(file: Blob): void {
    this.admService.uploadImage(file, this.path).subscribe(res => {
      if (res && typeof res === "string") {
        if (this.multiple) {
          this._uploadedFiles.push(res);
          this.control.setValue(this._uploadedFiles);
        } else {
          this.control.setValue(res);
        }
      }
    });
  }
}
