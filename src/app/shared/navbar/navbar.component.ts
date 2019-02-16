import { Component, Input } from '@angular/core';
import { UtilService } from '../../services/util.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() collapsibleNav: boolean;

  constructor(
    private utilService: UtilService,
    private userService: UserService
  ) {

  }
}
