/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PlaneTicketsTestModule } from '../../../test.module';
import { RoomPricelistUpdateComponent } from 'app/entities/room-pricelist/room-pricelist-update.component';
import { RoomPricelistService } from 'app/entities/room-pricelist/room-pricelist.service';
import { RoomPricelist } from 'app/shared/model/room-pricelist.model';

describe('Component Tests', () => {
    describe('RoomPricelist Management Update Component', () => {
        let comp: RoomPricelistUpdateComponent;
        let fixture: ComponentFixture<RoomPricelistUpdateComponent>;
        let service: RoomPricelistService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PlaneTicketsTestModule],
                declarations: [RoomPricelistUpdateComponent]
            })
                .overrideTemplate(RoomPricelistUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RoomPricelistUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RoomPricelistService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new RoomPricelist(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.roomPricelist = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new RoomPricelist();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.roomPricelist = entity;
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
