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
      queryParams: { dates: 'any', location: 'New York' }
    },
    {
      label: 'Bay Area Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Bay Area' }
    },
    {
      label: 'Miami Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Miami' }
    },
    {
      label: 'Chicago Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Chicago' }
    },
    {
      label: 'Washington Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Washington' }
    },
    {
      label: 'Atlanta Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Atlanta' }
    },
    {
      label: 'Los Angeles Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Los Angeles' }
    },
    {
      label: 'Nevada Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Nevada' }
    },
    {
      label: 'Wisconsin Shows',
      path: '/events',
      queryParams: { dates: 'any', location: 'Wisconsin' }
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
