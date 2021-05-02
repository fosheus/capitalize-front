import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'delete-file-dialog',
	templateUrl: 'delete-file.dialog.html',
})
export class DeleteFileDialog {

	constructor(
		public dialogRef: MatDialogRef<DeleteFileDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	onNoClick(): void {
		this.dialogRef.close(false);
	}

	onValidateClick(): void {
		this.dialogRef.close(true);
	}

}