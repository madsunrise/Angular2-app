import {Component, NgZone, ViewChild, Output, EventEmitter} from "@angular/core";
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

    upis: Upi[] = [];

    constructor(private zone:NgZone, private upiService: UpiService){
    }

    ngOnInit(){
        this.updateState();
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

    public updateStatus() {
        this.infoComponent.update();
    }

    @Output() fileDownloadedAndArchived = new EventEmitter();

    downloadAndArchive(item: Upi) {
        this.upiService.downloadFile(item);
        window.onfocus = () => {
            this.fileDownloadedAndArchived.emit();
            this.upiService.getCompleted().subscribe((data: Response) => {
                this.zone.run(() => {
                    this.upis = data.json();
                    console.log("List was updated, size: ", this.upis.length);
                })
            });
        }
    }

}


