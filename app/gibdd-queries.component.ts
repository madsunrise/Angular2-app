import {Component, EventEmitter, Output} from "@angular/core";
import {FileItem, FileUploader} from "ng2-file-upload";
import {serverURL} from "./app.module";
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


    constructor(private pingService: PingService) {
        this.uploader = new FileUploader({url: serverURL + 'upload'});

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            if (status == 422) {
                alert("Загруженный файл " + response + " имеет невалидную структуру!");
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
            let message = "Обнаружены файлы с неверным расширением:\n";
            for (let fileName of wrongFiles) {
                message += fileName + '\n';
            }
            alert(message);
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
}
