import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private authService: AuthenticationService, private modalService: ModalService) { }

    ngOnInit(): void {
    }

    clickAccount(): void {
        this.modalService.info(null, 'Indisponible', 'Cette fonctionnalité n\'est pas disponible pour le moment', 'Ok');
    }

    disconnect(): void {
        if (this.authService.isLoggedIn()) {
            this.modalService.info(null, 'Déconnexion', 'Etes-vous sûr de vouloir vous déconnecter ?', 'Oui', 'Non')
                .subscribe(ret => ret ? this.authService.logout() : null);
        } else {
            this.authService.logout();
        }
    }

    optionClicked(): void {
        this.modalService.info(null, 'Indisponible', 'Cette fonctionnalité n\'est pas disponible pour le moment', 'Ok');
    }

}
