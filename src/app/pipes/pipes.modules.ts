import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ToMinutePipe } from "./to-minute.pipe";

@NgModule({

    imports: [
        NativeScriptModule,
    ],
    declarations: [
        ToMinutePipe
    ],
    exports: [ToMinutePipe],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PipesModule { }
