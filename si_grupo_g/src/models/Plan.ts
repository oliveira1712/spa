export interface Plan {
  name: string;
  price: string;
  description: string;
  href: string;
  features: Array<string>;
  featured?: boolean;
}
export default Plan;
