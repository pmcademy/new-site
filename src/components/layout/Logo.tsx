import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The mark is the real PMcademy "P", extracted from the app icon as a white
 * shape on transparency, so it sits on a flat navy tile in either theme.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[7px] bg-navy">
        <Image
          src="/img/mark.png"
          alt=""
          width={16}
          height={16}
          className="h-4 w-4"
          priority
        />
      </span>
      <span className="text-[19px] font-semibold tracking-[-0.024em]">
        PMcademy
      </span>
    </span>
  );
}
