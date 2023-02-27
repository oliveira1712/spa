import TestimonialAuthor from './TestimonialAuthor';

export interface Testimonial {
  content: string;
  author: TestimonialAuthor;
  stars: number;
}

export default Testimonial;
