"use client";

import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Separator,
} from "@heroui/react";
import {
  ArrowRight,
  BookOpenText,
  Calculator,
  GraduationCap,
  NotebookPen,
} from "lucide-react";

const direkteWege = [
  {
    title: "Lernpfad",
    description:
        "Von Bernoulli-Experimenten bis Normalapproximation – in sinnvoller Reihenfolge aufgebaut.",
    href: "/docs/lernen/(bernoulli)",
    icon: GraduationCap,
    cta: "Zum Lernpfad",
  },
  {
    title: "Übungsaufgaben",
    description:
        "Aufgaben im Klausur-Stil mit Lösungen, damit du das Rechnen wirklich drin hast.",
    href: "/docs/ueben",
    icon: NotebookPen,
    cta: "Direkt üben",
  },
  {
    title: "Formeln & Spickzettel",
    description:
        "Wichtige Formeln und Begriffe kompakt, wenn du schnell etwas nachschauen willst.",
    href: "/docs/lernen/(binomialverteilung)",
    icon: Calculator,
    cta: "Nachschlagen",
  },
];

const lernSchritte = [
  {
    label: "1. Grundlagen klären",
    detail:
        "Was ist ein Bernoulli-Experiment, welche Parameter gibt es, und wann darfst du die Binomialverteilung überhaupt verwenden?",
  },
  {
    label: "2. Rechnen üben",
    detail:
        "Wahrscheinlichkeiten mit Taschenrechner oder Tabelle bestimmen, Aufgaben lesen und sinnvoll in Terme übersetzen.",
  },
  {
    label: "3. Prüfungsmodus",
    detail:
        "Gemischte Aufgabenserien, typische Fragestellungen und Stolperfallen – zum Durcharbeiten kurz vor Klausur oder Abi.",
  },
];

export default function HomePage() {
  return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pb-16 text-left">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-default-200 bg-content1/70 px-8 py-12 shadow-medium">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white/60 to-transparent dark:from-emerald-900/20 dark:via-background" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Chip color="success" variant="secondary" className="font-medium">
                  Binomialverteilung · Oberstufe
                </Chip>
                <Chip variant="secondary" className="font-medium" color="success">
                  Klausur- & Abi-Vorbereitung
                </Chip>
              </div>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.16em] text-default-500">
                  Stochastik ohne Gelaber
                </p>
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                  Binomialverteilung verstehen – nicht nur auswendig lernen.
                </h1>
                <p className="max-w-2xl text-lg text-default-600">
                  Hier findest du Erklärungen, Aufgaben und Formeln an einem Ort.
                  Kein Schulbuch-Rätselraten, sondern Beispiele, wie sie in
                  Klausuren wirklich dran kommen.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link href="/docs/lernen/bernoulli" className="flex items-center gap-2">
                    Mit der Theorie starten
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="/docs/ueben" className="flex items-center gap-2">
                    Direkt Aufgaben rechnen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="w-full border border-success-200/80 bg-success-50/70 dark:border-success-500/40 dark:bg-success-900/30">
              <CardHeader className="flex flex-col items-start gap-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-success-700 dark:text-success-200">
                <BookOpenText className="h-4 w-4" /> Wenn du gerade Stochastik
                hast
              </span>
                <p className="text-xl font-semibold">
                  Was dich hier konkret erwartet
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-default-700 dark:text-default-200">
                <p>
                  Die Seite ist für Schülerinnen und Schüler in der Oberstufe
                  gedacht – also genau für das Niveau, das in Klausuren und im Abi
                  abgefragt wird.
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>kurze, direkte Erklärungen ohne unnötige Theorie</li>
                  <li>
                    Aufgaben mit vollständigen Lösungen, nicht nur Endergebnissen
                  </li>
                  <li>
                    Hinweise, worauf Lehrer:innen gerne besonders achten
                    (Begriffe, Argumentation usw.)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Direkte Wege */}
        <section className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.14em] text-default-500">
                Wohin möchtest du?
              </p>
              <h2 className="text-2xl font-semibold">
                Wähle den Einstieg, der gerade passt
              </h2>
              <p className="text-default-600">
                Du musst nichts „richtig“ machen – such dir einfach das aus, was
                du als Nächstes brauchst.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {direkteWege.map(({ title, description, href, icon: Icon, cta }) => (
                <Card
                    key={title}
                    className="h-full border border-default-200 bg-content1/80 shadow-small transition hover:-translate-y-1 hover:shadow-medium"
                >
                  <CardHeader className="flex items-start gap-3">
                <span className="rounded-2xl bg-success-100/80 p-2 text-success-700 dark:bg-success-900/40 dark:text-success-200">
                  <Icon className="h-5 w-5" />
                </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      <p className="text-sm text-default-600">{description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                        asChild
                        variant="ghost"
                        className="justify-start px-0 font-semibold"
                    >
                      <Link href={href} className="flex items-center gap-2">
                        {cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
            ))}
          </div>
        </section>

        {/* Lernschritte */}
        <section className="rounded-3xl border border-default-200 bg-content1/60 px-6 py-8 shadow-small">
          <div className="flex flex-col gap-4">
            <p className="text-sm uppercase tracking-[0.12em] text-default-500">
              Wie du die Seite nutzen kannst
            </p>
            <h2 className="text-2xl font-semibold">In drei Schritten gut vorbereitet</h2>
            <p className="max-w-3xl text-default-600">
              Du musst nicht alles auf einmal durcharbeiten. Die Idee ist, dass
              du Schritt für Schritt sicherer wirst – zuerst beim Verständnis,
              dann beim Rechnen, am Ende bei kompletten Klausuraufgaben.
            </p>
            <Separator />
            <div className="grid gap-4 md:grid-cols-3">
              {lernSchritte.map((step) => (
                  <Card
                      key={step.label}
                      className="h-full border border-default-200 bg-background"
                  >
                    <CardContent className="space-y-2">
                      <Chip
                          size="sm"
                          color="success"
                          variant="secondary"
                          className="w-fit"
                      >
                        {step.label}
                      </Chip>
                      <p className="text-default-700">{step.detail}</p>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}
