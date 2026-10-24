import type { Metadata } from "next";
import { ActivityShell } from "@/components/ui";
import { TablesGame } from "./TablesGame";

export const metadata: Metadata = { title: "Times Tables" };

export default function TablesPage() {
  return (
    <ActivityShell title="Times Tables">
      <TablesGame />
    </ActivityShell>
  );
}
