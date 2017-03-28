import {Component, OnInit} from "@angular/core";
import {Upi} from "./upi";
import {UpiService} from "./upi.service";
import {Response} from "@angular/http";
import "rxjs/Rx";
import {IMyOptions, IMyDateModel} from "mydatepicker";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'archive-tab',
    templateUrl: '../templates/archive.html',
    providers: [ UpiService ]
})
export class ArchiveComponent implements OnInit {
    upis: Upi[];

    periods = [
        {value: 'day', viewValue: 'День'},
        {value: 'week', viewValue: 'Неделя'},
        {value: 'month', viewValue: 'Месяц'}
    ];
    currentPeriod: any = this.periods[0].value;

    constructor(private upiService: UpiService, private formBuilder: FormBuilder) {
    }

    private myDatePickerOptions: IMyOptions = {
        dayLabels: {su: "Вс", mo: "Пн", tu: "Вт", we: "Ср", th: "Чт", fr: "Пт", sa: "Сб"},
        monthLabels: { 1: "Янв", 2: "Фев", 3: "Март", 4: "Апр", 5: "Май", 6: "Июнь", 7: "Июль", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Ноя", 12: "Дек" },
        dateFormat: "dd.mm.yyyy",
        todayBtnTxt: "Сегодня",
        firstDayOfWeek: "mo",
        sunHighlight: true,
        width: "250px"
};

    private dateStart: any;
    private dateEnd: any;

    private request24h: boolean = true;    // Флаг, который равен true только если юзер запросил данные за последние 24 часа (период: сегодня) и при первой загрузке

    ngOnInit(){
        let currentDate = new Date();
        this.dateStart = {date: {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()}};
        this.dateEnd = {date: {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()}};
        this.updateState();
    }


    onPeriodClick() {
        let currentDate = new Date();
        this.dateEnd = {date: {year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate()}};

        switch (this.currentPeriod) {
            case 'day': {
                let dayAgo = new Date();
                dayAgo.setDate(dayAgo.getDate() - 1);
                this.request24h = true;             // Единственный случай, когда граничный день охватываем не полностью
                                                        // (берем записи за последние 24 часа, а не за последние 2 дня)
                this.dateStart = {date: {year: dayAgo.getFullYear(), month: dayAgo.getMonth() + 1, day: dayAgo.getDate()}};
                break;
            }
            case 'week': {
                let weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                this.dateStart = {date: {year: weekAgo.getFullYear(), month: weekAgo.getMonth() + 1, day: weekAgo.getDate()}};
                break;
            }

            case 'month': {
                let monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                this.dateStart = {date: {year: monthAgo.getFullYear(), month: monthAgo.getMonth() + 1, day: monthAgo.getDate()}};
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

        console.log("Updating data in ArchiveComponent");
        this.upiService.getArchived(rangeStart, rangeEnd)
            .subscribe((data: Response) => {
                this.upis = data.json();
            });
    }

    download(item: Upi) {
        this.upiService.downloadArchiveFile(item);
    }


    private getDateStartInMillis() {
        if (this.dateStart.date.year == 1970) {     // Если поле с датой пусто....
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


    private getDateEndInMillis() {
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


    onDateStartChanged(event: IMyDateModel) {
        let date = new Date(event.jsdate);
        this.dateStart = {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}};
        this.updateState();
    }

    onDateEndChanged(event: IMyDateModel) {
        let date = new Date(event.jsdate);
        this.dateEnd = {date: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}};
        this.updateState();
    }
}


