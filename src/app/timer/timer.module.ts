import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TrainerComponent } from "./trainer/trainer.component";
import { TimerRoutingModule } from "./timer-routing.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TimerActionComponent } from "./timer-action/timer-action.component";
import { PipesModule } from "../pipes/pipes.modules";


@NgModule({
    declarations: [TrainerComponent, TimerActionComponent],
    imports: [NativeScriptCommonModule,PipesModule, TimerRoutingModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {}
