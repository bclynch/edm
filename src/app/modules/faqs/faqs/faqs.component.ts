import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  faqs = [
    {
      title: 'How do you use EDM Flare like an app?',
      content: 'Bicycle rights cred next level, bespoke sartorial green juice listicle gochujang tbh. Put a bird on it single-origin coffee chia, poke everyday carry try-hard salvia mlkshk fanny pack cray keffiyeh kale chips.'
    },
    {
      title: 'How to install with iOS?',
      content: 'Brunch kickstarter retro humblebrag tote bag mlkshk kitsch. Intelligentsia prism gastropub, yr venmo bicycle rights pug vape sartorial forage literally man braid.'
    },
    {
      title: 'How to install with Android?',
      content: 'Vape distillery swag, vice kickstarter tacos direct trade cornhole palo santo. Subway tile narwhal squid cronut.'
    },
    {
      title: 'How can I change my notification policies?',
      content: 'Vape distillery swag, vice kickstarter tacos direct trade cornhole palo santo. Subway tile narwhal squid cronut.'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
