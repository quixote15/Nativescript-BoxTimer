import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { TrainerComponent } from "./trainer/trainer.component";
import { TimerRoutingModule } from "./timer-routing.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    declarations: [TrainerComponent],
    imports: [NativeScriptCommonModule, TimerRoutingModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class TimerModule {}
