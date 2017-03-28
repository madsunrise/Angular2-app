import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {GibddQueriesComponent} from "./gibdd-queries.component";
import {PingService} from "./ping-service";

@Component({
    selector: 'main-component',
    templateUrl: '../templates/main.html'
})

export class MainComponent {
    @ViewChild(GibddQueriesComponent)
    public queriesComponent: GibddQueriesComponent;
}
