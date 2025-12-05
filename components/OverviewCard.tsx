import {ReactNode} from "react";
import {Card} from "@heroui/react";
import {LightbulbIcon} from "lucide-react";
import {cn} from "@/lib/cn";

interface OverviewCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function OverviewCard({
                               title = "Kurzüberblick",
                               children,
                               className = "",
                             }: OverviewCardProps) {
  return (
      <div className="fd-content mx-auto w-full max-w-3xl">
        <Card
            variant="tertiary"
            className={cn(`
            w-full max-w-lg mt-8 
            rounded-2xl shadow-sm 
            px-5 py-5 
            flex flex-col
            space-y-3
            [&]:my-0
        `, className)}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <LightbulbIcon className="h-5 w-5 text-primary"/>
              <div className="text-sm font-semibold uppercase tracking-wide">
                {title}
              </div>
            </div>

            <div className="text-[15px] leading-snug">
              {children}
            </div>
          </div>
        </Card>
      </div>
  );
}
