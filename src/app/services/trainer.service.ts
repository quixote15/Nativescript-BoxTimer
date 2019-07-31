import { Injectable } from "@angular/core";
import { Training } from "../models";

@Injectable({
    providedIn: "root"
})
export class TrainerService {
    currentTraining: Training;
    clockIntervalId: any;
    currentInterval: number;
    pausedValue: number = null;
    isPaused: boolean = false;

    constructor() {}

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
        if (!isTraining) return "Duração do Treino";

        return isResting ? "Descanso" : `Round - ${currentRound}/${rounds}`;
    }

    setIsTraining(isTraining: boolean) {
        this.currentTraining.isTraining = isTraining;
    }

    startTraining() {
        let {
            duration,
            interval,
            currentRound,
            isResting,
            rounds
        } = this.currentTraining;
        let currentTimeCounter = this.pausedValue || duration; //começar treino
        this.currentTraining.isTraining = true;
        const setCurrentInterval = setInterval(() => {
            if (currentTimeCounter === 0 && currentRound === rounds) {
                return this.finishTraining();
            }

            if (currentTimeCounter === 0) {
                if (!isResting) {
                    currentTimeCounter = interval; //now decrement the resting time
                    isResting = true;
                } else {
                    currentRound++;
                    currentTimeCounter = duration;
                    isResting = false;
                }

                this.currentInterval = currentTimeCounter;
            } else {
                currentTimeCounter--;
                this.currentInterval = currentTimeCounter;
            }

            this.pausedValue = currentTimeCounter;
        }, 1000);

        this.clockIntervalId = setCurrentInterval;
    }

    togglePauseTraining() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            clearInterval(this.clockIntervalId);
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
        this.setTrainingModel(new Training());
    }
}
