/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { RoomPricelistDetailComponent } from 'app/entities/room-pricelist/room-pricelist-detail.component';
import { RoomPricelist } from 'app/shared/model/room-pricelist.model';

describe('Component Tests', () => {
    describe('RoomPricelist Management Detail Component', () => {
        let comp: RoomPricelistDetailComponent;
        let fixture: ComponentFixture<RoomPricelistDetailComponent>;
        const route = ({ data: of({ roomPricelist: new RoomPricelist(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [RoomPricelistDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RoomPricelistDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RoomPricelistDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.roomPricelist).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
