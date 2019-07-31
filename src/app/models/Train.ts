export class Training {
    id: number;
    description:String = 'Treino padrão de boxe.';
    rounds: number = 3;
    interval: number = 60;
    duration: number = 180;
    completedRounds: number = 0;
    isTraining: boolean = false;
    currentRound: number = 1;
    isResting: boolean = false;
    isPaused: boolean = false;
}
