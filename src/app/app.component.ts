import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
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

  constructor() {}

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
    const requestParams = {
      origin: 'test',
      request: this.messageCtrlChild.getRawValue(),
      success: true,
    }

    if (this.source) {
      this.source.postMessage(requestParams, 'http://localhost:4200');
    } else {
      window.parent.postMessage(requestParams, 'http://localhost:4200');
    }
  }
}
