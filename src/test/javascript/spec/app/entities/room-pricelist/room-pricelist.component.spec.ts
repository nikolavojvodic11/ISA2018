/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PlaneTicketsTestModule } from '../../../test.module';
import { RoomPricelistComponent } from 'app/entities/room-pricelist/room-pricelist.component';
import { RoomPricelistService } from 'app/entities/room-pricelist/room-pricelist.service';
import { RoomPricelist } from 'app/shared/model/room-pricelist.model';

describe('Component Tests', () => {
    describe('RoomPricelist Management Component', () => {
        let comp: RoomPricelistComponent;
        let fixture: ComponentFixture<RoomPricelistComponent>;
        let service: RoomPricelistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [RoomPricelistComponent],
                providers: []
            })
                .overrideTemplate(RoomPricelistComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoomPricelistComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomPricelistService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RoomPricelist(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.roomPricelists[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
