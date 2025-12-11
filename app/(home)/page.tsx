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
        title: "Lernen",
        description: "Von Bernoulli-Experimenten bis Normalverteilung – alles erklärt.",
        href: "/docs/lernen",
        icon: GraduationCap,
        cta: "Lernen starten",
    },
    {
        title: "Beispielaufgaben",
        description: "Beispielaufgaben aus dem Abitur mit ausführlichen Lösungen zum Nachvollziehen.",
        href: "/docs/lernen/examples/kakaopackungen",
        icon: NotebookPen,
        cta: "Nachschlagen",
    },
    {
        title: "Übungsaufgaben",
        description: "Aufgaben mit Lösungen aus früheren Abiturklausuren, damit du fit wirst.",
        href: "/docs/ueben",
        icon: Calculator,
        cta: "Direkt üben",
    },
];

export default function HomePage() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pb-16 text-left pt-4">
            {/* Hero */}
            <section
                className="relative overflow-hidden rounded-3xl border border-default-200 bg-content1/70 px-8 py-12 shadow-medium">
                <div
                    className="absolute inset-0 bg-linear-to-r from-emerald-50 via-white/60 to-transparent dark:from-emerald-900/20 dark:via-background"/>
                <div className="relative grid place-items-center gap-10 lg:grid-cols-1 lg:items-center">
                    <div className="space-y-5 max-w-3xl w-full">
                        <div className="flex flex-wrap justify-center gap-2">
                            <Chip color="success" variant="secondary" className="font-medium">
                                Binomialverteilung · Oberstufe
                            </Chip>
                            <Chip variant="secondary" className="font-medium" color="success">
                                Klausur- & Abi-Vorbereitung
                            </Chip>
                        </div>
                        <div className="space-y-3 text-center">
                            <p className="text-sm uppercase tracking-[0.16em] text-default-500">
                                Stochastik Einfach Erklärt
                            </p>
                            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                                Binomialverteilung verstehen – nicht nur auswendig lernen
                            </h1>
                            <p className="max-w-2xl mx-auto text-lg text-default-600">
                                Hier findest du Erklärungen, Aufgaben und Formeln an einem Ort.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Button asChild variant="primary" size="lg">
                                <Link href="/docs/lernen" className="flex items-center gap-2">
                                    Mit der Theorie starten
                                    <ArrowRight className="h-4 w-4"/>
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" size="lg">
                                <Link href="/docs/ueben" className="flex items-center gap-2">
                                    Direkt Übungsaufgaben rechnen
                                    <ArrowRight className="h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    </div>
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
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {direkteWege.map(({title, description, href, icon: Icon, cta}) => (
                        <Card
                            key={title}
                            className="h-full border border-default-200 bg-content1/80 shadow-small transition hover:-translate-y-1 hover:shadow-medium"
                        >
                            <CardHeader className="flex items-start gap-3">
                <span
                    className="rounded-2xl bg-success-100/80 p-2 text-success-700 dark:bg-success-900/40 dark:text-success-200">
                  <Icon className="h-5 w-5"/>
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
                                        <ArrowRight className="h-4 w-4"/>
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
