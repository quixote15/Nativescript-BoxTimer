import { Component, OnInit, ViewContainerRef, OnDestroy } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as application from "tns-core-modules/application";
import { Subscription } from "rxjs";
import {
    AndroidApplication,
    AndroidActivityBackPressedEventData
} from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { TNSPlayer } from "nativescript-audio-player";

import { Training, Status } from "~/app/models";
import { TrainerService } from "~/app/services/trainer.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "~/app/shared/ui/modal/modal.component";
import { PlayerService } from "~/app/services/player.service";

@Component({
    selector: "ns-training-on",
    templateUrl: "./training-on.component.html",
    styleUrls: ["./training-on.component.scss"]
})
export class TrainingOnComponent implements OnInit, OnDestroy {
    currentTraining: Training;
    isTraining: boolean = false;
    private subscription: Subscription;
    private subscriptionSound: Subscription;

    constructor(
        private page: Page,
        public trainer: TrainerService,
        private router: RouterExtensions,
        private player: PlayerService
    ) {}

    ngOnInit() {
        if (isAndroid) {
            application.android.on(
                AndroidApplication.activityBackPressedEvent,
                (data: AndroidActivityBackPressedEventData) => {
                    data.cancel = true;
                    // prevents default back button behavior
                    this.forceTrainingStop();
                }
            );
        }

        this.page.actionBarHidden = true;
        this.trainer.startTraining();
        this.subscriptionSound = this.trainer
            .getSoundStatus()
            .subscribe(status => {
                switch (status) {
                    case Status.GO:
                        return this.player.playStatusTrack(Status.GO);
                    case Status.IS_COUNTINGDOWN:
                        return this.player.playStatusTrack(
                            Status.IS_COUNTINGDOWN
                        );
                }
            });
        this.subscription = this.trainer.getStatus().subscribe(async status => {
            switch (status) {
                case Status.PAUSED:
                    return this.player.togglePlay();
                case Status.TRAINING:
                    return this.player.togglePlay();
                case Status.WILL_FORCE_STOP:
                    const endTraining = await dialogs.confirm({
                        title: "Tem certeza que vai terminar o treino?",
                        okButtonText: "Sim",
                        cancelButtonText: "Não"
                    });
                    console.log("resultado da modal: " + endTraining);
                    // result argument is boolean
                    if (endTraining) {
                        this.trainer.finishTraining();
                    }
                    /*
                        //Não fazer nada se o usuário clicar em NÃO ?
                        
                    else {
                        this.trainer.resumeTraining(); //resume
                    }*

                    break;
                case Status.DONE:
                    return this.router.backToPreviousPage();

            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscriptionSound.unsubscribe();
    }

    startTraining() {
        this.isTraining = true;
        this.trainer.setIsTraining(this.isTraining);
        this.trainer.startTraining();
    }

    forceTrainingStop() {
        //this.trainer.finishTraining();
        this.trainer.setStatus(Status.WILL_FORCE_STOP);
        this.isTraining = false;
        //this.router.backToPreviousPage();
    }

    pauseTraining() {
        this.trainer.pauseTraining();
    }

    resumeTraining() {
        this.trainer.resumeTraining();
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
