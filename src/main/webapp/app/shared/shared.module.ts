import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { PlaneTicketsSharedLibsModule, PlaneTicketsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { CompanyTypeFilterPipe } from './pipes/company-type-filter.pipe';

@NgModule({
    imports: [PlaneTicketsSharedLibsModule, PlaneTicketsSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, CompanyTypeFilterPipe],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [PlaneTicketsSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, CompanyTypeFilterPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlaneTicketsSharedModule {
    static forRoot() {
        return {
            ngModule: PlaneTicketsSharedModule
        };
    }
}
