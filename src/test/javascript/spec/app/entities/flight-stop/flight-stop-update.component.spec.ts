/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { FlightStopUpdateComponent } from 'app/entities/flight-stop/flight-stop-update.component';
import { FlightStopService } from 'app/entities/flight-stop/flight-stop.service';
import { FlightStop } from 'app/shared/model/flight-stop.model';

describe('Component Tests', () => {
    describe('FlightStop Management Update Component', () => {
        let comp: FlightStopUpdateComponent;
        let fixture: ComponentFixture<FlightStopUpdateComponent>;
        let service: FlightStopService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [FlightStopUpdateComponent]
            })
                .overrideTemplate(FlightStopUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightStopUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightStopService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightStop(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightStop = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightStop();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightStop = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
