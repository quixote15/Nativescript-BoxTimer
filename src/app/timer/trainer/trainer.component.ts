import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { Training } from "~/app/models";

@Component({
    selector: "ns-trainer",
    templateUrl: "./trainer.component.html",
    styleUrls: ["./trainer.component.scss"]
})
export class TrainerComponent implements OnInit {
    currentTraining: Training = new Training();
    isTraining: boolean = false;

    constructor(private page: Page) {}

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    startTraining(){
        this.isTraining = !this.isTraining;
    }

    onBack(){
        if(this.isTraining){
            //Tem certeza que deseja parar o treino ???
        }else {
            //navigate
        }
    }
}
