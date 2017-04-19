import {Component, EventEmitter, Output, ViewContainerRef} from "@angular/core";
import {FileItem, FileUploader} from "ng2-file-upload";
import {serverURL} from "./app.module";
import {PingService} from "./ping-service";
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {Dialog} from "./dialog.component";
import {wrapIntoObservable} from "@angular/router/src/utils/collection";


@Component({
    selector: 'gibdd-queries',
    templateUrl: '../templates/gibdd-queries.html',
    providers: [ PingService ]
})




export class GibddQueriesComponent {
    private uploader;

    public loading: boolean = false;

    @Output() filesUploaded = new EventEmitter();
    dialogRef: MdDialogRef<any>;


    constructor(private pingService: PingService, public dialog: MdDialog,
                public viewContainerRef: ViewContainerRef) {
        this.uploader = new FileUploader({url: serverURL + 'upload'});

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
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

        this.uploader.onCompleteAll = () => {       // Callback на завершение загрузки всех файлов
            this.loading = false;
            this.uploader.clearQueue();
            this.filesUploaded.emit();
        };
    }

    // Проверяем выбранные файлы на соответствие расширению
    checkChoosenFiles() {
        let temp: FileItem[] = [];
        let wrongFiles: string[] = [];

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

    onFileDrop(file: File) {
        this.checkChoosenFiles();
    }


    removeItem(item: FileItem) {
        if (!this.loading) {
            item.remove();
        }
    }

    startUploading() {
        this.loading = true;
        this.uploader.uploadAll();
    }

    disableClearButton(): boolean {
        return !this.uploader.queue.length || this.loading;
    }

    disableUploadButton(): boolean {
        return !this.uploader.getNotUploadedItems().length || this.loading || !this.pingService.isConnected();
    }

    private openDialog (title, message, items) {
        let config = new MdDialogConfig();
        config.viewContainerRef = this.viewContainerRef;
        this.dialogRef = this.dialog.open(Dialog, config);
        this.dialogRef.componentInstance.title = title;
        this.dialogRef.componentInstance.message = message;
        this.dialogRef.componentInstance.items = items;
    }
}
