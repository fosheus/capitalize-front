import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericDialog } from 'src/app/main/dialogs/generic-dialog/generic.dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  alert(width: string, title: string, content: string, okButton: string, koButton?: string): Observable<any> {
    const data: any = { title, content, okButton, koButton };
    data.titleStyle = 'color:red';
    data.title = 'Attention : ' + title;
    const dialogRef = this.dialog.open(GenericDialog, {
      width,
      data
    });
    return dialogRef.afterClosed();
  }

  info(width: string, title: string, content: string, okButton: string, koButton?: string): Observable<any> {
    const data: any = { title, content, okButton, koButton };
    data.titleStyle = 'color:blue';
    const dialogRef = this.dialog.open(GenericDialog, {
      width,
      data
    });

    return dialogRef.afterClosed();
  }
}
