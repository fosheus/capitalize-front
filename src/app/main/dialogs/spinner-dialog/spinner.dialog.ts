import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
	selector: 'spinner-dailog',
	templateUrl: 'spinner.dialog.html',
})
export class SpinnerDialog {

	fileToUpload: File | null;

	constructor(
		public dialogRef: MatDialogRef<SpinnerDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

}
