import { NgModule } from '@angular/core';

import { PlaneTicketsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PlaneTicketsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PlaneTicketsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PlaneTicketsSharedCommonModule {}
