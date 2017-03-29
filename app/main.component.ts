import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {GibddQueriesComponent} from "./gibdd-queries.component";

@Component({
    selector: 'main-component',
    templateUrl: '../templates/main.html'
})

export class MainComponent {
    @ViewChild(GibddQueriesComponent)
    public queriesComponent: GibddQueriesComponent;
}
