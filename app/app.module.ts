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

export let serverURL = 'http://172.20.255.62:8081/action/';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, FileUploadModule, ReactiveFormsModule, MaterialModule, MyDatePickerModule ],
    declarations: [ AppComponent, MainComponent, GibddQueriesComponent, PostResponsesComponent, InWorkComponent, ArchiveComponent, InfoComponent ],
    bootstrap:    [ AppComponent ],
})
export class AppModule { }