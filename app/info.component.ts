import {Component} from "@angular/core";
import {Response} from "@angular/http";
import {UpiService} from "./upi.service";

@Component({
    selector: 'info',
    templateUrl: '../templates/info.html',
    providers: [ UpiService ]
})


export class InfoComponent {
    private waitingForSendCount: Number = 0;
    private waitingForSend: String = "Нет записей";
    private waitingForResponse: String[] = [];

    private parsing: boolean = false;

    constructor(private infoService: UpiService ) { }


    update() {
        this.infoService.getStatus().subscribe((data: Response) => {
            console.log("Status information has been got");
            this.waitingForSendCount = data.json().waitForSend;
            if (this.waitingForSendCount == 0) {
                this.waitingForSend = "Нет записей";
            }
            else {
                this.waitingForSend = this.waitingForSendCount + " постановлений ожидаются к отправке";
            }

            this.parsing =  data.json().parsing;

            this.waitingForResponse = data.json().waitForResponse;
            if (this.waitingForResponse == null) {
                this.waitingForResponse = [];
            }
        });
    }

    isParsingFiles(): boolean {
        return this.parsing;
    }
}
