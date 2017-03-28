"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const forms_1 = require("@angular/forms");
const app_component_1 = require("./app.component");
const gibdd_queries_component_1 = require("./gibdd-queries.component");
const post_responses_component_1 = require("./post-responses.component");
const http_1 = require("@angular/http");
const ng2_file_upload_1 = require("ng2-file-upload");
const main_component_1 = require("./main.component");
const info_component_1 = require("./info.component");
const material_1 = require("@angular/material");
require("hammerjs");
const in_work_component_1 = require("./in-work.component");
const archive_component_1 = require("./archive.component");
const mydatepicker_1 = require("mydatepicker");
exports.serverURL = 'http://172.20.255.62:8081/action/';
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, ng2_file_upload_1.FileUploadModule, forms_1.ReactiveFormsModule, material_1.MaterialModule, mydatepicker_1.MyDatePickerModule],
        declarations: [app_component_1.AppComponent, main_component_1.MainComponent, gibdd_queries_component_1.GibddQueriesComponent, post_responses_component_1.PostResponsesComponent, in_work_component_1.InWorkComponent, archive_component_1.ArchiveComponent, info_component_1.InfoComponent],
        bootstrap: [app_component_1.AppComponent],
    }), 
    __metadata('design:paramtypes', [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map