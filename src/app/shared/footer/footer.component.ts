import { Component } from '@angular/core';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = Date.now();

  bottomLinks = [
    {
      label: 'About',
      path: '/about',
      fragment: null
    },
    {
      label: 'Terms',
      path: '/policies',
      fragment: 'terms'
    },
    {
      label: 'Privacy Policy',
      path: '/policies',
      fragment: 'privacy'
    }
  ];

  usageLinks = [
    {
      label: 'FAQs',
      path: '/faqs'
    }
  ];

  locationLinks = [
    {
      label: 'New York Shows',
      path: '/events',
      queryParams: { location: 'New York', dates: 'any' }
    },
    {
      label: 'Bay Area Shows',
      path: '/events',
      queryParams: { location: 'Bay Area', dates: 'any' }
    },
    {
      label: 'Miami Shows',
      path: '/events',
      queryParams: { location: 'Miami', dates: 'any' }
    },
    {
      label: 'Chicago Shows',
      path: '/events',
      queryParams: { location: 'Chicago', dates: 'any' }
    },
    {
      label: 'Washington Shows',
      path: '/events',
      queryParams: { location: 'Washington', dates: 'any' }
    },
    {
      label: 'Georgia Shows',
      path: '/events',
      queryParams: { location: 'Georgia', dates: 'any' }
    },
    {
      label: 'Los Angeles Shows',
      path: '/events',
      queryParams: { location: 'Los Angeles', dates: 'any' }
    },
    {
      label: 'Nevada Shows',
      path: '/events',
      queryParams: { location: 'Nevada', dates: 'any' }
    },
    {
      label: 'Wisconsin Shows',
      path: '/events',
      queryParams: { location: 'Wisconsin', dates: 'any' }
    },
    {
      label: 'All Locations',
      path: '/locations',
      queryParams: null
    },
  ];

  connectLinks = [
    {
      label: 'Contact Us',
      path: '/contact',
      icon: faPaperPlane,
      type: 'internal'
    },
    {
      label: 'Instagram',
      path: 'https://www.instagram.com/edmflare/',
      icon: faInstagram,
      type: 'external'
    },
    {
      label: 'Facebook',
      path: 'https://www.facebook.com/edmflare/',
      icon: faFacebook,
      type: 'external'
    },
    {
      label: 'Twitter',
      path: 'https://twitter.com/edmflare',
      icon: faTwitter,
      type: 'external'
    },
  ];

  constructor(

  ) { }

}
