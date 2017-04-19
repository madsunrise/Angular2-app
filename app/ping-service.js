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
const material_1 = require("@angular/material");
/**
 * Created by rudnev on 3/24/17.
 */
let PingService = class PingService {
    constructor(http, snackBar) {
        this.http = http;
        this.snackBar = snackBar;
        this.pingInterval = 3000;
        this.connected = true;
        this.checkPing();
        setInterval(() => {
            this.checkPing();
        }, this.pingInterval);
    }
    checkPing() {
        this.http.get(app_module_1.serverURL + "ping")
            .timeout(2000)
            .subscribe(res => {
            this.connected = true;
        }, (err) => {
            this.connected = false;
            this.snackBar.open("Нет соединения с сервером!", null, {
                duration: this.pingInterval,
            });
        });
    }
    isConnected() {
        return this.connected;
    }
};
PingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, material_1.MdSnackBar])
], PingService);
exports.PingService = PingService;
//# sourceMappingURL=ping-service.js.map