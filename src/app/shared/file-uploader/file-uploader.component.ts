import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Subscription } from "rxjs";
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
export class FileUploaderComponent implements OnDestroy, AfterViewInit {
  @ViewChild('fileInput')
  private _input!: ElementRef;

  private _control: AbstractControl | null = new FormControl();
  public get control() { return this._control; }
  @Input()
  public set control(c: AbstractControl | null) { this._control = c; }

  private _path: string | undefined;
  public get path() { return this._path; }
  @Input()
  public set path(p: string | undefined) { this._path = p; }

  private _uploadedFiles: Array<string> = [];
  public get uploadedFiles() { return this._uploadedFiles; }
  @Input()
  public set uploadedFiles(f: Array<string>) {
    if (f instanceof Array) {
      this._uploadedFiles = f;
      this._files = [];

      this._uploadedFiles.forEach(file => {
        if (file)
          this.admService.fetchImage(file).then(res => {
            res.blob().then(v => {
              this._files.push(URL.createObjectURL(v));
              this.cdr.detectChanges();
            });
          });
      });
    }

    this.cdr.detectChanges();
  }

  private _multiple: boolean = false;
  public get multiple() { return this._multiple; }
  @Input()
  public set multiple(m: boolean) { this._multiple = m; }

  private _files: Array<string> = [];
  public get files() { return this._files; }

  private _sub: Subscription | undefined;

  constructor(private cdr: ChangeDetectorRef, private admService: AdmService) { }

  ngAfterViewInit(): void {
    this._sub = this.control?.valueChanges.subscribe(val => {
      this.cdr.detectChanges();
    });
  }

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
        this.uploadFile(inputNode.files[0]);
      }
    }
  }

  public removeImage(index: number): void {
    this._files.splice(index, 1);
    this._uploadedFiles.splice(index, 1);

    if (this.multiple)
      this.control?.setValue(this._uploadedFiles);
    else
      this.control?.setValue(null);

    this.cdr.detectChanges();
  }

  private uploadFile(file: Blob): void {
    this.admService.uploadImage(file, this.path).subscribe(res => {
      if (res && typeof res.image === "string") {
        if (this.multiple) {
          this._uploadedFiles.push(res.image);
          this.control?.setValue(this._uploadedFiles);
        } else {
          this.control?.setValue(res.image);
        }
      }
    });
  }

  ngOnDestroy(): void {
      this._sub?.unsubscribe();
  }
}
