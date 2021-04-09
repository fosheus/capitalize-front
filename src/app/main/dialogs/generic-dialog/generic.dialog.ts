import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: 'generic-dialog',
	templateUrl: 'generic.dialog.html',
})
export class GenericDialog {

	fileToUpload: File | null;

	constructor(
		public dialogRef: MatDialogRef<GenericDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }


	handleFileInput(files: FileList) {
		this.fileToUpload = files.item(0);
	}

	onNoClick(): void {
		this.dialogRef.close(false);
	}

	onValidateClick(): void {
		this.dialogRef.close(true);
	}

}
