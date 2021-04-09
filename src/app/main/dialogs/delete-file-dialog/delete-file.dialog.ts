import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'delete-file-dialog',
	templateUrl: 'delete-file.dialog.html',
})
export class DeleteFileDialog {

	constructor(
		public dialogRef: MatDialogRef<DeleteFileDialog>,
		@Inject(MAT_DIALOG_DATA) public nomFichier: string) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}