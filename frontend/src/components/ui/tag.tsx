import { categoryColorMap } from "@/lib/constants";

function hexToTagColors(hex: string): { light: string; dark: string } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    light: `rgba(${r}, ${g}, ${b}, 0.15)`,
    dark: hex,
  };
}

interface TagProps {
  label: string;
  color: string;
}

export function Tag({ label, color }: TagProps) {
  const colors =
    categoryColorMap[color] ??
    (color.startsWith("#") ? hexToTagColors(color) : { light: "#E5E7EB", dark: "#374151" });

  return (
    <span
      className="inline-flex items-center rounded-[999px] px-[12px] py-[4px] text-[14px] font-medium leading-[20px]"
      style={{ backgroundColor: colors.light, color: colors.dark }}
    >
      {label}
    </span>
  );
}
