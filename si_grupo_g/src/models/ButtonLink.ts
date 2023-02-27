import Button from "./Button";

export interface ButtonLink extends Button {
  href: string;
  children: React.ReactNode;
}

export default ButtonLink;
