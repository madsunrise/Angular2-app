import {Component, EventEmitter, Output} from "@angular/core";
import {FileUploader, FileItem} from "ng2-file-upload";
import {serverURL} from "./app.module";
import {MdSnackBar} from "@angular/material";
import {PingService} from "./ping-service";


@Component({
    selector: 'gibdd-queries',
    templateUrl: '../templates/gibdd-queries.html',
    providers: [ PingService ]
})


export class GibddQueriesComponent {
    private uploader;

    public loading: boolean = false;

    @Output() filesUploaded = new EventEmitter();
    @Output() uploadStarted = new EventEmitter();


    constructor(private pingService: PingService) {
        this.uploader = new FileUploader({url: serverURL + 'upload'});

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status == 422) {
                alert("Загруженный файл " + response + " имеет невалидную структуру!");
            }
        };

        this.uploader.onCompleteAll = () => {
            this.loading = false;
            this.uploader.clearQueue();
            this.filesUploaded.emit();
        };
    }

    // Проверяем выбранные файлы на соответствие расширению
    onFilesChoosen() {
        let temp: FileItem[] = [];
        let wrongFiles: string[] = [];

        for (let item of this.uploader.queue) {
            if (item.file.name.endsWith(".txt")) {
                temp.push(item);
            }
            else {
                wrongFiles.push(item.file.name);
            }
        }
        if (wrongFiles.length > 0) {
            this.uploader.queue = temp;
            let message = "Обнаружены файлы с неверным расширением:\n";
            for (let fileName of wrongFiles) {
                message += fileName + '\n';
            }
            alert(message);
        }
    }


    removeItem(item: FileItem) {
        if (!this.loading) {
            item.remove();
        }
    }

    startUploading() {
        this.loading = true;
        this.uploadStarted.emit();
        this.uploader.uploadAll();
    }

    disableClearButton(): boolean {
        return !this.uploader.queue.length || this.loading;
    }

    disableUploadButton(): boolean {
        return !this.uploader.getNotUploadedItems().length || this.loading || !this.pingService.isConnected();
    }
}
