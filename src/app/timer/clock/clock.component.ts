import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "ns-clock",
    templateUrl: "./clock.component.html",
    styleUrls: ["./clock.component.css"]
})
export class ClockComponent implements OnInit {
    @Input() interval: number = 180;

    constructor() {}

    ngOnInit() {
       
    }
}
