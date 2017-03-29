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
let ArchiveComponent = class ArchiveComponent {
    constructor(upiService) {
        this.upiService = upiService;
        this.periods = [
            { value: 'day', viewValue: 'День' },
            { value: 'week', viewValue: 'Неделя' },
            { value: 'month', viewValue: 'Месяц' }
        ];
        this.currentPeriod = this.periods[0].value;
        this.myDatePickerOptions = {
            dayLabels: { su: "Вс", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб" },
            monthLabels: { 1: "Янв", 2: "Фев", 3: "Март", 4: "Апр", 5: "Май", 6: "Июнь", 7: "Июль", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Ноя", 12: "Дек" },
            dateFormat: "dd.mm.yyyy",
            todayBtnTxt: "Сегодня",
            firstDayOfWeek: "mo",
            sunHighlight: true,
            width: "250px"
        };
        this.request24h = true; // Флаг, который равен true только если юзер запросил данные за последние 24 часа (период: сегодня) и при первой загрузке
    }
    ngOnInit() {
        let currentDate = new Date();
        this.dateStart = { date: { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() } };
        this.dateEnd = { date: { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() } };
        this.updateState();
    }
    onPeriodClick() {
        let currentDate = new Date();
        this.dateEnd = { date: { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() } };
        switch (this.currentPeriod) {
            case 'day': {
                let dayAgo = new Date();
                dayAgo.setDate(dayAgo.getDate() - 1);
                this.request24h = true; // Единственный случай, когда граничный день охватываем не полностью
                // (берем записи за последние 24 часа, а не за последние 2 дня)
                this.dateStart = { date: { year: dayAgo.getFullYear(), month: dayAgo.getMonth() + 1, day: dayAgo.getDate() } };
                break;
            }
            case 'week': {
                let weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                this.dateStart = { date: { year: weekAgo.getFullYear(), month: weekAgo.getMonth() + 1, day: weekAgo.getDate() } };
                break;
            }
            case 'month': {
                let monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                this.dateStart = { date: { year: monthAgo.getFullYear(), month: monthAgo.getMonth() + 1, day: monthAgo.getDate() } };
                break;
            }
            default: return;
        }
        this.updateState();
    }
    updateState() {
        let rangeStart = this.getDateStartInMillis();
        let rangeEnd = this.getDateEndInMillis();
        if (rangeStart == 0 || rangeEnd == 0 || rangeStart > rangeEnd) {
            return;
        }
        console.log("Updating state in ArchiveComponent...");
        this.upiService.getArchived(rangeStart, rangeEnd)
            .subscribe((data) => {
            this.upis = data.json();
        });
    }
    download(item) {
        this.upiService.downloadArchiveFile(item);
    }
    getDateStartInMillis() {
        if (this.dateStart.date.year == 1970) {
            return 0;
        }
        let result = new Date();
        let year = this.dateStart.date.year;
        let month = this.dateStart.date.month;
        let day = this.dateStart.date.day;
        result.setFullYear(year, month - 1, day);
        if (!this.request24h) {
            result.setHours(0);
            result.setMinutes(0);
        }
        this.request24h = false; // Сбрасываем флаг
        return result.getTime();
    }
    getDateEndInMillis() {
        if (this.dateEnd.date.year == 1970) {
            return 0;
        }
        let result = new Date();
        let year = this.dateEnd.date.year;
        let month = this.dateEnd.date.month;
        let day = this.dateEnd.date.day;
        result.setFullYear(year, month - 1, day);
        result.setHours(23);
        result.setMinutes(59);
        return result.getTime();
    }
    onDateStartChanged(event) {
        let date = new Date(event.jsdate);
        this.dateStart = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
        this.updateState();
    }
    onDateEndChanged(event) {
        let date = new Date(event.jsdate);
        this.dateEnd = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
        this.updateState();
    }
};
ArchiveComponent = __decorate([
    core_1.Component({
        selector: 'archive-tab',
        templateUrl: '../templates/archive.html',
        providers: [upi_service_1.UpiService]
    }), 
    __metadata('design:paramtypes', [upi_service_1.UpiService])
], ArchiveComponent);
exports.ArchiveComponent = ArchiveComponent;
//# sourceMappingURL=archive.component.js.map