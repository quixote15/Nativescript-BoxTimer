import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as application from "tns-core-modules/application";
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
export class TrainingOnComponent implements OnInit {
    currentTraining: Training;
    isTraining: boolean = false;

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
                    console.log("chamou back button");
                    data.cancel = true; // prevents default back button behavior
                }
            );
        }

        this.page.actionBarHidden = true;
        this.trainer.startTraining();
        this.trainer.getStatus().subscribe(status => {
            if (status === Status.WILL_FORCE_STOP) {
            }
            if (status === Status.DONE) {
            }
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
                    return dialogs
                        .confirm({
                            title: "Tem certeza que vai terminar o treino?",
                            okButtonText: "Sim",
                            cancelButtonText: "Não"
                        })
                        .then(endTraining => {
                            // result argument is boolean
                            if (endTraining) {
                                this.trainer.finishTraining();
                            } else {
                                this.trainer.togglePauseTraining(); //resume
                            }
                        });
                case Status.DONE:
                    return this.router.backToPreviousPage();
            }
        });
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
