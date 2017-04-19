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
const http_1 = require("@angular/http");
const app_module_1 = require("./app.module");
// Сервис загрузки данных с сервера об ответах от почты России
let UpiService = class UpiService {
    constructor(http) {
        this.http = http;
    }
    getCompleted() {
        const dataURL = app_module_1.serverURL + 'list';
        return this.http.get(dataURL);
    }
    getArchived(start, end) {
        const dataURL = app_module_1.serverURL + 'listArchived?start=' + start + '&end=' + end;
        return this.http.get(dataURL);
    }
    // Запрос информации о сделанных ранее запросах
    getStatus() {
        const dataURL = app_module_1.serverURL + 'info';
        return this.http.get(dataURL);
    }
    downloadFile(upi) {
        window.location.href = app_module_1.serverURL + 'getAndZip?name=' + upi.name;
    }
    downloadArchiveFile(upi) {
        window.location.href = app_module_1.serverURL + 'getArchived?name=' + upi.name + "&date=" + upi.date;
    }
};
UpiService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UpiService);
exports.UpiService = UpiService;
//# sourceMappingURL=upi.service.js.map