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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ng2_file_upload_1 = require("ng2-file-upload");
const app_module_1 = require("./app.module");
const ping_service_1 = require("./ping-service");
const material_1 = require("@angular/material");
const dialog_component_1 = require("./dialog.component");
let GibddQueriesComponent = class GibddQueriesComponent {
    constructor(pingService, dialog, viewContainerRef) {
        this.pingService = pingService;
        this.dialog = dialog;
        this.viewContainerRef = viewContainerRef;
        this.loading = false;
        this.filesUploaded = new core_1.EventEmitter();
        this.uploader = new ng2_file_upload_1.FileUploader({ url: app_module_1.serverURL + 'upload' });
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            if (status == 422) {
                let responseObj = JSON.parse(response);
                let title = "Загруженный файл " + responseObj.fileName + " имеет невалидную структуру!";
                let message = "Ошибка в строке: " + responseObj.invalidLine;
                this.openDialog(title, message, null);
            }
            if (status == 500) {
                let title = "Внимание!";
                let message = "При загрузке файла произошла ошибка!";
                this.openDialog(title, message, null);
            }
        };
        this.uploader.onCompleteAll = () => {
            this.loading = false;
            this.uploader.clearQueue();
            this.filesUploaded.emit();
        };
    }
    // Проверяем выбранные файлы на соответствие расширению
    checkChoosenFiles() {
        let temp = [];
        let wrongFiles = [];
        for (let item of this.uploader.queue) {
            if (item.file.name.toLowerCase().endsWith(".txt")) {
                temp.push(item);
            }
            else {
                wrongFiles.push(item.file.name);
            }
        }
        if (wrongFiles.length > 0) {
            this.uploader.queue = temp;
            let title = "Внимание!";
            let message = "Обнаружены файлы с неверным расширением:";
            this.openDialog(title, message, wrongFiles);
        }
    }
    onFileDrop(file) {
        this.checkChoosenFiles();
    }
    removeItem(item) {
        if (!this.loading) {
            item.remove();
        }
    }
    startUploading() {
        this.loading = true;
        this.uploader.uploadAll();
    }
    disableClearButton() {
        return !this.uploader.queue.length || this.loading;
    }
    disableUploadButton() {
        return !this.uploader.getNotUploadedItems().length || this.loading || !this.pingService.isConnected();
    }
    openDialog(title, message, items) {
        let config = new material_1.MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(dialog_component_1.Dialog, config);
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.message = message;
        this.dialogRef.componentInstance.items = items;
    }
};
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GibddQueriesComponent.prototype, "filesUploaded", void 0);
GibddQueriesComponent = __decorate([
    core_1.Component({
        selector: 'gibdd-queries',
        templateUrl: '../templates/gibdd-queries.html',
        providers: [ping_service_1.PingService]
    }),
    __metadata("design:paramtypes", [ping_service_1.PingService, material_1.MdDialog,
        core_1.ViewContainerRef])
], GibddQueriesComponent);
exports.GibddQueriesComponent = GibddQueriesComponent;
//# sourceMappingURL=gibdd-queries.component.js.map