import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(
    private dialogRef: DialogRef
  ) {}

  close() {
    this.dialogRef.close({ closeModal: true });
  }
}
