"use client";

import {Tabs} from "@heroui/react";
import {usePathname, useRouter} from "fumadocs-core/framework";

const TABS = [
  {id: "lernen", label: "Lernen", href: "/docs/lernen"},
  {id: "ueben", label: "Übungsaufgaben", href: "/docs/ueben"},
];

export function DocsModeTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const selectedKey =
      TABS.find((tab) => pathname.startsWith(tab.href))?.id ?? "lernen";

  return (
      <Tabs
          className="w-full max-w-xs"
          selectedKey={selectedKey}
          onSelectionChange={(key) => {
            const tab = TABS.find((tab) => tab.id === key);
            if (tab) router.push(tab.href);
          }}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Bereich wählen">
            {TABS.map((tab) => (
                <Tabs.Tab key={tab.id} id={tab.id}>
                  {tab.label}
                  <Tabs.Indicator />
                </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
  );
}