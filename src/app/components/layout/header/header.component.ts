import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../../services/user.service';
import { UserResponse } from '../../../responses/user/user.response';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbPopoverModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  userResponse: UserResponse | null = null;
  activeNavItem: number = 0;

  constructor(
    private userSerice: User,
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userSerice.userResponse$.subscribe({
      next: (userResponse) => {
        this.userResponse = userResponse;
      },
    });
  }

  handleItemClick(item: number) {
    this.setActiveNavItem(item);
    if (item === 0) {
      this.router.navigate(['/profile']);
    } else if (item === 1) {
      this.router.navigate(['/orders']);
    } else if (item === 2) {
      this.tokenService.removeToken();
      this.userSerice.removeUserResponseFromLocalStorage();
    }
  }

  setActiveNavItem(item: number) {
    this.activeNavItem = item;
    console.log(this.activeNavItem);
  }
}
