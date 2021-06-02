import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-add-file-dialog',
    templateUrl: 'add-file.dialog.html',
    styleUrls: ['add-file.dialog.scss']
})
export class AddFileDialog {

    fileToUpload: File | null;

    constructor(
        public dialogRef: MatDialogRef<AddFileDialog>,
        @Inject(MAT_DIALOG_DATA) public nomFichier: string) { }

    handleFileInput(files: FileList): void {
        this.fileToUpload = files.item(0);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onValidateClick(): void {
        this.dialogRef.close(this.fileToUpload);
    }

}
