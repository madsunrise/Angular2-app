import {Upi} from "./upi";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {serverURL} from "./app.module";


// Сервис загрузки данных с сервера об ответах от почты России
@Injectable()
export class UpiService {

    constructor(private http: Http) {}

    getCompleted() {
        const dataURL = serverURL + 'list';
        return this.http.get(dataURL);
    }

    getArchived(start: Number, end: Number) {
        const dataURL = serverURL + 'listArchived?start=' + start + '&end=' + end;
        return this.http.get(dataURL);
    }

    // Запрос информации о сделанных ранее запросах
    getStatus() {
        const dataURL = serverURL + 'info';
        return this.http.get(dataURL);
    }


    downloadFile(upi: Upi) {
        window.location.href = serverURL + 'getAndZip?name=' + upi.name;
    }

    downloadArchiveFile(upi: Upi) {
        window.location.href = serverURL + 'getArchived?name=' + upi.name + "&date=" + upi.date;
    }
}
