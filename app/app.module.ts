import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {GibddQueriesComponent} from "./gibdd-queries.component";
import {PostResponsesComponent} from "./post-responses.component";
import {HttpModule} from "@angular/http";
import {FileUploadModule} from "ng2-file-upload";
import {MainComponent} from "./main.component";
import {InfoComponent} from "./info.component";
import {MaterialModule} from "@angular/material";
import "hammerjs";
import {InWorkComponent} from "./in-work.component";
import {ArchiveComponent} from "./archive.component";
import {MyDatePickerModule} from "mydatepicker";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Dialog} from "./dialog.component";

export let serverURL = 'http://127.0.0.1:8081/action/';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, FileUploadModule, BrowserAnimationsModule, ReactiveFormsModule, MaterialModule, MyDatePickerModule ],
    declarations: [ AppComponent, MainComponent, GibddQueriesComponent, PostResponsesComponent, InWorkComponent, ArchiveComponent, InfoComponent, Dialog],
    bootstrap:    [ AppComponent ],
    entryComponents: [ Dialog ]
})
export class AppModule { }