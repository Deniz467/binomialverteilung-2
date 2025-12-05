import {source} from '@/lib/source';
import {DocsLayout} from 'fumadocs-ui/layouts/notebook';
import {baseOptions} from '@/lib/layout.shared';
import {Separator, Tabs} from "@heroui/react";
import {DocsModeTabs} from "@/components/DocsModeTabs";
import {FilePenLineIcon, GraduationCapIcon} from "lucide-react";

export default function Layout({children}: LayoutProps<'/docs'>) {
  return (
      <DocsLayout
          tree={source.pageTree}
          themeSwitch={{mode: "light-dark-system"}}
          {...baseOptions}
          nav={{
            ...baseOptions.nav,
            children: (
                <div className="mr-2 flex items-center gap-3 md:mr-0">
                </div>
            ),
            mode: "top",
          }}
          sidebar={{
            tabs: [
              {
                title: "Lernen",
                description: "Erklärungen & Theorie",
                url: "/docs/lernen",
                icon: <GraduationCapIcon />
              },
              {
                title: "Übungsaufgaben",
                description: "Aufgaben & Lösungen",
                url: "/docs/ueben",
                icon: <FilePenLineIcon />
              }
            ]
          }}

      >
        {children}
      </DocsLayout>
  );
}
