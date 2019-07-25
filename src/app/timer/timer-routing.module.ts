import { NgModule } from "@angular/core";
import { TrainerComponent } from "./trainer/trainer.component";
import { Route } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Route[] = [
    {
        path: "",
        component: TrainerComponent
    }
];
@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})

export class TimerRoutingModule {}
