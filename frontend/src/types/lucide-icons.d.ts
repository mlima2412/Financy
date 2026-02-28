declare module "lucide-react/dist/esm/icons/*" {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
  const icon: ForwardRefExoticComponent<
    SVGProps<SVGSVGElement> & {
      size?: string | number;
      strokeWidth?: string | number;
      absoluteStrokeWidth?: boolean;
    } & RefAttributes<SVGSVGElement>
  >;
  export default icon;
}
