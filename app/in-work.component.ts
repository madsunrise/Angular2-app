import {Component, EventEmitter, NgZone, Output, ViewChild} from "@angular/core";
import {Upi} from "./upi";
import {UpiService} from "./upi.service";
import {Response} from "@angular/http";
import "rxjs/Rx";
import {InfoComponent} from "./info.component";


@Component({
    selector: 'in-work-tab',
    templateUrl: '../templates/in-work.html',
    providers: [ UpiService ]
})
export class InWorkComponent {
    @ViewChild(InfoComponent)
    private infoComponent: InfoComponent;

    private upis: Upi[] = [];

    private timer: any;

    constructor(private zone:NgZone, private upiService: UpiService) {
    }

    ngOnInit() {
        this.startCheckingStatus(); // Начинаем опрашивать infoComponent по таймеру
    }

    public updateState() {
        console.log("Updating state in InWorkComponent...");
        this.updateUpiList();
        this.updateStatus();
    }


   private updateUpiList() {
        this.upiService.getCompleted().subscribe((data: Response) => {
            this.upis = data.json();
        });
    }

    private updateStatus() {
        this.infoComponent.update();
    }


    private startCheckingStatus() {
        this.updateState();
        this.timer = setInterval(() => {
            this.updateState();
        }, 5*1000);
    }


    @Output() fileDownloadedAndArchived = new EventEmitter();

    downloadAndArchive(item: Upi) {
        this.upiService.downloadFile(item);     // Скачать файл и через секунду обновить обе вкладки
        setTimeout(() => {
            this.fileDownloadedAndArchived.emit();
            this.upiService.getCompleted().subscribe((data: Response) => {
                this.zone.run(() => {
                    this.upis = data.json();
                })
            });
        }, 1000);
    }
}


