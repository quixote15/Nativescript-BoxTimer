import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "ns-timer-action",
    templateUrl: "./timer-action.component.html",
    styleUrls: ["./timer-action.component.css"]
})
export class TimerActionComponent implements OnInit {
    @Input() counter: number = 60;
    @Input() isCountingTime = true;
    @Output() onAddChange = new EventEmitter();
    @Output() onSubtractChange = new EventEmitter();
    constructor() {}

    ngOnInit() {}

    onAdd() {
        console.log("time: ", !this.isCountingTime);
        const increment: number = this.isCountingTime ? Number(1) : Number(10);

        this.counter = this.counter + Number(increment);
    }

    onSubtract() {
        if (!this.isCountingTime) {
            this.counter = this.counter - 1;
            this.counter = this.counter >= 0 ? this.counter : 0;
        }
    }
}
