import {Component} from "@angular/core";
import {Response} from "@angular/http";
import {UpiService} from "./upi.service";

@Component({
    selector: 'info',
    templateUrl: '../templates/info.html',
    providers: [ UpiService ]
})


export class InfoComponent {
    waitingForSendCount: Number = 0;
    waitingForSend: String = "Нет записей";
    waitingForResponse: String[] = [];

    constructor(private infoService: UpiService ) { }


    update() {
        this.infoService.getStatus().subscribe((data: Response) => {
            console.log("Status information has been got");
            this.waitingForSendCount = data.json().waitForSend;
            if (this.waitingForSendCount == 0) {
                this.waitingForSend = "Нет записей";
            }
            else {
                this.waitingForSend = this.waitingForSendCount + " постановлений ожидается к отправке";
            }

            this.waitingForResponse = data.json().waitForResponse;
            if (this.waitingForResponse == null) {
                this.waitingForResponse = [];
            }
        });
    }
}
