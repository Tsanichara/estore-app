import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Catnavigation } from "./components/catnavigation/catnavigation";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Catnavigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'estore';
}
