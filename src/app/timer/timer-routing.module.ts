import { NgModule } from "@angular/core";
import { TrainerComponent } from "./trainer/trainer.component";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TrainingOnComponent } from "./training-on/training-on.component";

const routes: Route[] = [
    {
        path: "",
        component: TrainerComponent
    },
    {
        path: "trainingOn",
        component: TrainingOnComponent
    }
];
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})

export class TimerRoutingModule {}
