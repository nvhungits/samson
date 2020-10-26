import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { SLIDERS } from './mock-slider'

@Component({
  selector: '[app-slider]',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  settings = {
    transition: "fade",
    slotamount: 8,
    masterspeed: 700,
    delay: 9400,
    thumb: "//../../assets/frontend/pages/img/revolutionslider/thumbs/thumb2.jpg"
  }
  sliders = SLIDERS
  slidersBD = [
    {
      bg: "https://bcmedia.vn/uploads/images/SLIDER1.jpg"
    },
    {
      bg: "https://bcmedia.vn/uploads/images/SLIDER2.jpg"
    },
    {
      bg: "https://bcmedia.vn/uploads/images/SLIDER3.jpg"
    },
    {
      bg: "https://bcmedia.vn/uploads/images/SLIDER4.jpg"
    }
  ]
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
