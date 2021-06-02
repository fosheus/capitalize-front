import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';

import { ModalService } from './modal.service';

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule],
            providers: [{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }]
        });
        service = TestBed.inject(ModalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
