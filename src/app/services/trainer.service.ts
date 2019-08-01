import { Injectable } from "@angular/core";
import { Training, Status } from "../models";
import { Subject, Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class TrainerService {
    currentTraining: Training;
    clockIntervalId: any;
    currentInterval: number;
    pausedValue: number = null;
    isPaused: boolean = false;
    status = new Subject<Status>();

    constructor() {}

    getStatus(): Observable<Status> {
        return this.status.asObservable();
    }

    setStatus(status: Status) {
        if(status === Status.WILL_FORCE_STOP){
            if(!this.currentTraining.isPaused){
                this.togglePauseTraining(); //pause training
            }
        }
        this.status.next(status);
    }

    setTrainingModel(training: Training) {
        this.currentTraining = training;
        this.currentInterval = training.duration;
    }

    getTrainingStatus() {
        const {
            isResting,
            currentRound,
            rounds,
            isTraining
        } = this.currentTraining;

        return isResting
            ? `Descanso - ${currentRound}/${rounds}`
            : `Round - ${currentRound}/${rounds}`;
    }

    setIsTraining(isTraining: boolean) {
        this.currentTraining.isTraining = isTraining;
    }

    startTraining() {
        let { duration, interval, rounds } = this.currentTraining;
        let currentTimeCounter = this.pausedValue || duration; //começar treino
        this.currentTraining.isTraining = true;
        this.status.next(Status.TRAINING);
        const setCurrentInterval = setInterval(() => {
            if (
                currentTimeCounter === 0 &&
                this.currentTraining.currentRound === rounds
            ) {
                return this.finishTraining();
            }

            if (currentTimeCounter === 0) {
                if (!this.currentTraining.isResting) {
                    currentTimeCounter = interval; //now decrement the resting time
                    this.currentTraining.isResting = true;
                    this.status.next(Status.RESTING);
                } else {
                    this.currentTraining.currentRound++;
                    currentTimeCounter = duration;
                    this.currentTraining.isResting = false;
                    this.status.next(Status.TRAINING);
                }

                this.currentInterval = currentTimeCounter;
            } else {
                currentTimeCounter--;
                this.currentInterval = currentTimeCounter;
            }

            this.pausedValue = currentTimeCounter;
        }, 100);

        this.clockIntervalId = setCurrentInterval;
    }

    togglePauseTraining() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            clearInterval(this.clockIntervalId);
            this.status.next(Status.PAUSED);
        } else {
            this.startTraining();
        }
    }

    getCurrentInterval() {
        return this.currentInterval;
    }

    finishTraining() {
        console.log("chamou clear");
        clearInterval(this.clockIntervalId);
        this.isPaused = false;
        this.pausedValue = null;
        this.status.next(Status.DONE);
        //this.setTrainingModel(new Training());
    }
}
