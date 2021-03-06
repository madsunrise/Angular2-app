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
const core_2 = require("@angular/core");
const gibdd_queries_component_1 = require("./gibdd-queries.component");
let MainComponent = class MainComponent {
};
__decorate([
    core_2.ViewChild(gibdd_queries_component_1.GibddQueriesComponent),
    __metadata("design:type", gibdd_queries_component_1.GibddQueriesComponent)
], MainComponent.prototype, "queriesComponent", void 0);
MainComponent = __decorate([
    core_1.Component({
        selector: 'main-component',
        templateUrl: '../templates/main.html'
    })
], MainComponent);
exports.MainComponent = MainComponent;
//# sourceMappingURL=main.component.js.map