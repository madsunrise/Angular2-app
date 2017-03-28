import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {serverURL} from "./app.module";
import {MdSnackBar} from "@angular/material";

/**
 * Created by rudnev on 3/24/17.
 */
@Injectable()
export class PingService {

    private pingInterval = 3000;

    private connected = true;

    constructor(private http: Http, private snackBar: MdSnackBar) {
        this.checkPing();
        setInterval(() => {
           this.checkPing();
        }, this.pingInterval);

    }

    private checkPing() {
        this.http.get(serverURL + "ping")
            .timeout(2000)
            .subscribe(res => {
                    this.connected = true;
                },
                (err) => {
                    this.connected = false;
                    this.snackBar.open("Нет соединения с сервером!", null, {
                        duration: this.pingInterval,
                    });
                }
            );
    }

    public isConnected(): boolean {
        return this.connected;
    }
}