/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { HotelServiceDetailComponent } from 'app/entities/hotel-service/hotel-service-detail.component';
import { HotelService } from 'app/shared/model/hotel-service.model';

describe('Component Tests', () => {
    describe('HotelService Management Detail Component', () => {
        let comp: HotelServiceDetailComponent;
        let fixture: ComponentFixture<HotelServiceDetailComponent>;
        const route = ({ data: of({ hotelService: new HotelService(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [HotelServiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(HotelServiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(HotelServiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.hotelService).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
