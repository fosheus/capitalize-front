import { Component, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GenericDialog } from 'src/app/main/dialogs/generic-dialog/generic.dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  alert(width: any, title: string, content: string, okButton: string = 'OK', koButton?: string): Observable<any> {
    const data: any = { title, content, okButton, koButton };
    data.titleStyle = 'color:red';
    data.title = 'Attention : ' + title;
    const dialogRef = this.dialog.open(GenericDialog, {
      width,
      data
    });
    return dialogRef.afterClosed();
  }

  info(width: any, title: string, content: string, okButton: string, koButton?: string): Observable<any> {
    const data: any = { title, content, okButton, koButton };
    data.titleStyle = 'color:#3f51b5';
    const dialogRef = this.dialog.open(GenericDialog, {
      width,
      data
    });

    return dialogRef.afterClosed();
  }

  serverError(message: string): Observable<any> {
    const data: any = { title: 'Une erreur est survenue', content: message, okButton: 'OK' };
    data.titleStyle = 'color:#990000';
    const dialogRef = this.dialog.open(GenericDialog, {
      data
    });

    return dialogRef.afterClosed();
  }
}
