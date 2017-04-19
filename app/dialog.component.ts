import {MdDialogRef} from "@angular/material";
import {Component} from "@angular/core";
/**
 * Created by developer on 4/19/17.
 */
@Component({
    selector: 'dialog1',
    templateUrl: '../templates/dialog.html',
})
export class Dialog {
    title: string;
    message: string;
    items: string[];
    constructor(public dialogRef: MdDialogRef<any>) { }
}