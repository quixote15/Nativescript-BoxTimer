import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Training } from "~/app/models";
import { TrainerService } from "~/app/services/trainer.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-trainer",
    templateUrl: "./trainer.component.html",
    styleUrls: ["./trainer.component.scss"]
})
export class TrainerComponent implements OnInit {
    currentTraining: Training ;
    isTraining: boolean = false;

    constructor(
        private page: Page,
        private trainer: TrainerService,
        private router: RouterExtensions
    ) {
        console.log('chamour');
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.currentTraining  = new Training();
        this.trainer.setTrainingModel(this.currentTraining);
    }

    startTraining() {
        this.trainer.setIsTraining(true);
        this.trainer.setTrainingModel(this.currentTraining);
        //this.trainer.startTraining();
        this.router.navigate(["/trainingOn"]);
    }

    finishTraining() {
        this.trainer.finishTraining();
        this.isTraining = false;
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
