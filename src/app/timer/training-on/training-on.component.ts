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

import { Training, Status } from "~/app/models";
import { TrainerService } from "~/app/services/trainer.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "~/app/shared/ui/modal/modal.component";

@Component({
    selector: "ns-training-on",
    templateUrl: "./training-on.component.html",
    styleUrls: ["./training-on.component.scss"]
})
export class TrainingOnComponent implements OnInit, OnDestroy {
    currentTraining: Training;
    isTraining: boolean = false;
    private subscription: Subscription;

    constructor(
        private page: Page,
        public trainer: TrainerService,
        private router: RouterExtensions,
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef
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
        this.subscription = this.trainer.getStatus().subscribe(async (status) => {

            switch (status) {
                case Status.WILL_FORCE_STOP:
                    /*return this.modalDialog
                        .showModal(ModalComponent, {
                            fullscreen: false,
                            viewContainerRef: this.vcRef,
                            context: {}
                        })
                        .then((action: string) => {
                            console.log(action);
                            if (action === "yes") {
                                this.trainer.finishTraining();
                            } else {
                                this.trainer.togglePauseTraining(); //resume
                            }
                        });*/
                     const endTraining = await dialogs
                        .confirm({
                            title: "Tem certeza que vai terminar o treino?",
                            okButtonText: "Sim",
                            cancelButtonText: "Não"
                        });
                        console.log('resultado da modal: ' + endTraining)
                        // result argument is boolean
                        if (endTraining) {
                            this.trainer.finishTraining();
                        } else {
                            this.trainer.togglePauseTraining(); //resume
                        }

                        break;
                case Status.DONE:
                    return this.router.backToPreviousPage();
            }
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
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
