import {Component, ViewChild} from "@angular/core";
import {UpiService} from "./upi.service";
import "rxjs/Rx";
import {InWorkComponent} from "./in-work.component";
import {ArchiveComponent} from "./archive.component";


@Component({
    selector: 'post-responses',
    templateUrl: '../templates/post-responses.html',
    providers: [ UpiService ]
})
export class PostResponsesComponent {
    @ViewChild(InWorkComponent)
    private inWorkTab: InWorkComponent;

    @ViewChild(ArchiveComponent)
    private archiveTab: ArchiveComponent;


    uploadCompleted() {
        this.inWorkTab.startCheckingStatus();
    }

    updateAllTabs() {
        this.inWorkTab.updateState();
        this.archiveTab.updateState();
    }
}


