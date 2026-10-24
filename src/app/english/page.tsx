import type { Metadata } from "next";
import { ActivityShell } from "@/components/ui";
import { EnglishGames } from "./EnglishGames";

export const metadata: Metadata = { title: "English" };

export default function EnglishPage() {
  return (
    <ActivityShell title="English">
      <EnglishGames />
    </ActivityShell>
  );
}
