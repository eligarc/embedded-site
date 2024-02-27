import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './components/dialog/dialog.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  infoParent = '';
  source: any;

  messageCtrlChild = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  @HostListener('window:message', ['$event']) onMessage(e: MessageEvent) {
    const parsedData = e.data;

    if (e.origin === 'http://localhost:4200' && parsedData.origin === 'plus') {
      console.log('Request:', parsedData, e);
      this.infoParent = parsedData.request;
      this.source = e.source;
    }
  }

  constructor(public dialog: Dialog) {}

  openDialog() {
    const ref = this.dialog.open(DialogComponent, {
      minWidth: '300px',
    });

    ref.closed.subscribe((resp: any) => {
      if (resp) {
        this.sendDataParent(resp);
      }
    });
  }

  ngOnInit() {
    // window.addEventListener('message', (e: MessageEvent) => {
    //   const parsedData = e.data;
    //   if (e.origin === 'http://localhost:4200' && parsedData.origin === 'plus') {
    //     console.log('Request:', parsedData, e);
    //     this.infoParent = parsedData.request;
    //     this.source = e.source;
    //   }
    // });
  }

  sendMenssage() {

    this.sendDataParent(this.messageCtrlChild.getRawValue());
  }

  private sendDataParent(request: object | string) {
    const requestParams = {
      origin: 'test',
      request,
      success: true,
    };

    if (this.source) {
      this.source.postMessage(requestParams, 'http://localhost:4200');
    } else {
      window.parent.postMessage(requestParams, 'http://localhost:4200');
    }
  }
}