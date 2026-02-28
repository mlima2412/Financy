import BriefcaseBusiness from "lucide-react/dist/esm/icons/briefcase-business";
import CarFront from "lucide-react/dist/esm/icons/car-front";
import Car from "lucide-react/dist/esm/icons/car";
import HeartPulse from "lucide-react/dist/esm/icons/heart-pulse";
import PiggyBank from "lucide-react/dist/esm/icons/piggy-bank";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Ticket from "lucide-react/dist/esm/icons/ticket";
import Wrench from "lucide-react/dist/esm/icons/wrench";
import Utensils from "lucide-react/dist/esm/icons/utensils";
import PawPrint from "lucide-react/dist/esm/icons/paw-print";
import House from "lucide-react/dist/esm/icons/house";
import Home from "lucide-react/dist/esm/icons/home";
import Gift from "lucide-react/dist/esm/icons/gift";
import Dumbbell from "lucide-react/dist/esm/icons/dumbbell";
import BookOpen from "lucide-react/dist/esm/icons/book-open";
import Luggage from "lucide-react/dist/esm/icons/luggage";
import Mailbox from "lucide-react/dist/esm/icons/mailbox";
import ReceiptText from "lucide-react/dist/esm/icons/receipt-text";
import Wallet from "lucide-react/dist/esm/icons/wallet";
import Laptop from "lucide-react/dist/esm/icons/laptop";
import Gamepad2 from "lucide-react/dist/esm/icons/gamepad-2";
import CircleHelp from "lucide-react/dist/esm/icons/circle-help";
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: string | number;
  strokeWidth?: string | number;
};

const iconMap: Record<string, ComponentType<IconProps>> = {
  "briefcase-business": BriefcaseBusiness,
  "car-front": CarFront,
  car: Car,
  "heart-pulse": HeartPulse,
  "piggy-bank": PiggyBank,
  "shopping-cart": ShoppingCart,
  ticket: Ticket,
  wrench: Wrench,
  utensils: Utensils,
  "paw-print": PawPrint,
  house: House,
  home: Home,
  gift: Gift,
  dumbbell: Dumbbell,
  "book-open": BookOpen,
  luggage: Luggage,
  mailbox: Mailbox,
  "receipt-text": ReceiptText,
  wallet: Wallet,
  laptop: Laptop,
  "gamepad-2": Gamepad2,
};

interface DynamicIconProps extends IconProps {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const Icon = iconMap[name] ?? CircleHelp;
  return <Icon {...props} />;
}
