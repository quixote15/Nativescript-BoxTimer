import { PipesModule } from "../pipes/pipes.modules";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule} from 'nativescript-angular/forms';

import { TrainerComponent } from "./trainer/trainer.component";
import { TimerRoutingModule } from "./timer-routing.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TimerActionComponent } from "./timer-action/timer-action.component";
import { ClockComponent } from "./clock/clock.component";
import { TrainingOnComponent } from "./training-on/training-on.component";


@NgModule({
    declarations: [TrainerComponent, TimerActionComponent, ClockComponent, TrainingOnComponent],
    imports: [NativeScriptCommonModule, PipesModule, NativeScriptFormsModule, TimerRoutingModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {}
