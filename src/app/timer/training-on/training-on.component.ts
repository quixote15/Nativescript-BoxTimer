import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Training } from "~/app/models";
import { TrainerService } from "~/app/services/trainer.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-training-on",
    templateUrl: "./training-on.component.html",
    styleUrls: ["./training-on.component.scss"]
})
export class TrainingOnComponent implements OnInit {
    currentTraining: Training;
    isTraining: boolean = false;

    constructor(
        private page: Page,
        public trainer: TrainerService,
        private router: RouterExtensions
    ) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.trainer.startTraining();
    }

    startTraining() {
        this.isTraining = true;
        this.trainer.setIsTraining(this.isTraining);
        this.trainer.startTraining();
    }

    finishTraining() {
        this.trainer.finishTraining();
        this.isTraining = false;
        this.router.backToPreviousPage();
    }

    pauseTraining() {
        this.trainer.togglePauseTraining();
    }

    onBack() {
        if (this.isTraining) {
            //Tem certeza que deseja parar o treino ???
        } else {
            //navigate
        }
    }

    get headerTitle() {
        return this.trainer.getTrainingStatus();
    }

    get currentInterval() {
        return this.trainer.getCurrentInterval();
    }
}
