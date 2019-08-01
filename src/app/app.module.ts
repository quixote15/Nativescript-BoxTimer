import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TimerModule } from "./timer/timer.module";
import { ToMinutePipe } from "./pipes/to-minute.pipe";
import { PipesModule } from "./pipes/pipes.modules";
import { TrainerService } from "./services/trainer.service";
import { ModalComponent } from "./shared/ui/modal/modal.component";

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, TimerModule, PipesModule, AppRoutingModule],
    declarations: [AppComponent],
    providers: [TrainerService],
    schemas: [NO_ERRORS_SCHEMA],
    entryComponents: [ModalComponent]
})
export class AppModule {}
