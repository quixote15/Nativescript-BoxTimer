import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "ns-trainer",
    templateUrl: "./trainer.component.html",
    styleUrls: ["./trainer.component.css"]
})
export class TrainerComponent implements OnInit {
    constructor(private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
}
