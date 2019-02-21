/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { AvailableHotelServiceDetailComponent } from 'app/entities/available-hotel-service/available-hotel-service-detail.component';
import { AvailableHotelService } from 'app/shared/model/available-hotel-service.model';

describe('Component Tests', () => {
    describe('AvailableHotelService Management Detail Component', () => {
        let comp: AvailableHotelServiceDetailComponent;
        let fixture: ComponentFixture<AvailableHotelServiceDetailComponent>;
        const route = ({ data: of({ availableHotelService: new AvailableHotelService(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [AvailableHotelServiceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AvailableHotelServiceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AvailableHotelServiceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.availableHotelService).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
