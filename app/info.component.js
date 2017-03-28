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
const upi_service_1 = require("./upi.service");
let InfoComponent = class InfoComponent {
    constructor(infoService) {
        this.infoService = infoService;
        this.waitingForSendCount = 0;
        this.waitingForSend = "Нет записей";
        this.waitingForResponse = [];
    }
    update() {
        this.infoService.getStatus().subscribe((data) => {
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
};
InfoComponent = __decorate([
    core_1.Component({
        selector: 'info',
        templateUrl: '../templates/info.html',
        providers: [upi_service_1.UpiService]
    }), 
    __metadata('design:paramtypes', [upi_service_1.UpiService])
], InfoComponent);
exports.InfoComponent = InfoComponent;
//# sourceMappingURL=info.component.js.map