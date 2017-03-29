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
require("rxjs/Rx");
const in_work_component_1 = require("./in-work.component");
const archive_component_1 = require("./archive.component");
let PostResponsesComponent = class PostResponsesComponent {
    uploadCompleted() {
        this.inWorkTab.startCheckingStatus();
    }
    updateAllTabs() {
        this.inWorkTab.updateState();
        this.archiveTab.updateState();
    }
};
__decorate([
    core_1.ViewChild(in_work_component_1.InWorkComponent), 
    __metadata('design:type', in_work_component_1.InWorkComponent)
], PostResponsesComponent.prototype, "inWorkTab", void 0);
__decorate([
    core_1.ViewChild(archive_component_1.ArchiveComponent), 
    __metadata('design:type', archive_component_1.ArchiveComponent)
], PostResponsesComponent.prototype, "archiveTab", void 0);
PostResponsesComponent = __decorate([
    core_1.Component({
        selector: 'post-responses',
        templateUrl: '../templates/post-responses.html',
        providers: [upi_service_1.UpiService]
    }), 
    __metadata('design:paramtypes', [])
], PostResponsesComponent);
exports.PostResponsesComponent = PostResponsesComponent;
//# sourceMappingURL=post-responses.component.js.map