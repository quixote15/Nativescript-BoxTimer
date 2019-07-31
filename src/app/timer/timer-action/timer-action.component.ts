import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "ns-timer-action",
    templateUrl: "./timer-action.component.html",
    styleUrls: ["./timer-action.component.css"]
})
export class TimerActionComponent implements OnInit {
    @Input() counter: number = 60;
    @Input() isCountingTime = true;
    @Input() hasActionButtons = true;
    @Output() counterChange = new EventEmitter();
    constructor() {}

    ngOnInit() {}

    onAdd() {
        const increment: number = this.isCountingTime ? 10 : 1;

        this.counter = this.counter + Number(increment);
        this.counterChange.emit(this.counter);
    }

    onSubtract() {
        const increment: number = this.isCountingTime ? 10 : 1;
        this.counter = this.counter - increment;
        this.counter = this.counter >= 0 ? this.counter : 0;
        this.counterChange.emit(this.counter);
    }

    onChange(){
        this.counterChange.emit(this.counter);
    }
}
