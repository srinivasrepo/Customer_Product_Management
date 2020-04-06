import { Component, Input } from "@angular/core";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    templateUrl:'../html/dialog.html',
})

export class DialogComponent{
    
    @Input() message: string;    
     
    constructor( public dialogRef: MatDialogRef<DialogComponent>) {    }

    proceed() {
        this.dialogRef.close(true);
    }
    cancel() {
        this.dialogRef.close(false);
    }
}