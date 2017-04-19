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
const upi_service_1 = require("./upi.service");
require("rxjs/Rx");
const info_component_1 = require("./info.component");
let InWorkComponent = class InWorkComponent {
    constructor(zone, upiService) {
        this.zone = zone;
        this.upiService = upiService;
        this.upis = [];
        this.fileDownloadedAndArchived = new core_1.EventEmitter();
    }
    ngOnInit() {
        this.startCheckingStatus(); // Начинаем опрашивать infoComponent по таймеру
    }
    updateState() {
        console.log("Updating state in InWorkComponent...");
        this.updateUpiList();
        this.updateStatus();
    }
    updateUpiList() {
        this.upiService.getCompleted().subscribe((data) => {
            this.upis = data.json();
        });
    }
    updateStatus() {
        this.infoComponent.update();
    }
    startCheckingStatus() {
        this.updateState();
        this.timer = setInterval(() => {
            this.updateState();
        }, 5 * 1000);
    }
    downloadAndArchive(item) {
        this.upiService.downloadFile(item); // Скачать файл и через секунду обновить обе вкладки
        setTimeout(() => {
            this.fileDownloadedAndArchived.emit();
            this.upiService.getCompleted().subscribe((data) => {
                this.zone.run(() => {
                    this.upis = data.json();
                });
            });
        }, 1000);
    }
};
__decorate([
    core_1.ViewChild(info_component_1.InfoComponent),
    __metadata("design:type", info_component_1.InfoComponent)
], InWorkComponent.prototype, "infoComponent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], InWorkComponent.prototype, "fileDownloadedAndArchived", void 0);
InWorkComponent = __decorate([
    core_1.Component({
        selector: 'in-work-tab',
        templateUrl: '../templates/in-work.html',
        providers: [upi_service_1.UpiService]
    }),
    __metadata("design:paramtypes", [core_1.NgZone, upi_service_1.UpiService])
], InWorkComponent);
exports.InWorkComponent = InWorkComponent;
//# sourceMappingURL=in-work.component.js.map