"use client";

import React, {
  Children,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {Card, Button, Chip} from "@heroui/react";

/* -------------------------------------------------------
 * TYPES
 * ----------------------------------------------------- */

type IntroProps = { children?: ReactNode };
type SlotProps = { children?: ReactNode };

type TaskProps = {
  id: string;
  label?: string;
  children: ReactNode;
  cas?: boolean;
};

type TaskHintProps = {
  children: ReactNode;
  number?: number;
};

type InternalHint = {
  content: ReactNode;
  number?: number;
};

type InternalTask = {
  id: string;
  label?: string;
  prompt?: ReactNode;
  question?: ReactNode;
  hints: InternalHint[];
  solution?: ReactNode;
  cas?: boolean;
};

type PersistedTaskState = {
  shownHints: number;
  showSolution: boolean;
};

type PersistedState = {
  index: number;
  tasks: Record<string, PersistedTaskState>;
};

interface InteractiveExerciseProps {
  title?: string;
  storageKey?: string;
  children: ReactNode;
}

interface InteractiveExerciseStatic {
  Intro: typeof Intro;
  Task: TaskComponent;
}

type InteractiveExerciseComponent = React.FC<InteractiveExerciseProps> &
    InteractiveExerciseStatic;

/* -------------------------------------------------------
 * DUMB SUBCOMPONENTS
 * ----------------------------------------------------- */

const Intro: React.FC<IntroProps> = ({children}) => <>{children}</>;
const TaskPrompt: React.FC<SlotProps> = ({children}) => <>{children}</>;
const TaskQuestion: React.FC<SlotProps> = ({children}) => <>{children}</>;
const TaskHints: React.FC<SlotProps> = ({children}) => <>{children}</>;
const TaskHint: React.FC<TaskHintProps> = ({children}) => <>{children}</>;
const TaskSolution: React.FC<SlotProps> = ({children}) => <>{children}</>;

type TaskComponent = React.FC<TaskProps> & {
  Prompt: typeof TaskPrompt;
  Question: typeof TaskQuestion;
  Hints: typeof TaskHints;
  Hint: typeof TaskHint;
  Solution: typeof TaskSolution;
};

const Task: TaskComponent = ({children}) => <>{children}</>;
Task.Prompt = TaskPrompt;
Task.Question = TaskQuestion;
Task.Hints = TaskHints;
Task.Hint = TaskHint;
Task.Solution = TaskSolution;

/* -------------------------------------------------------
 * PARSING TASK STRUCTURE
 * ----------------------------------------------------- */

function extractTaskFromElement(el: React.ReactElement<TaskProps>): InternalTask {
  const {id, label, cas} = el.props;

  const childrenArray = Children.toArray(el.props.children).filter(
      (c): c is React.ReactElement<{ children?: ReactNode }> => isValidElement(c),
  );

  const prompt = childrenArray[0]?.props?.children;
  const question = childrenArray[1]?.props?.children;
  const solution = childrenArray[childrenArray.length - 1]?.props?.children;

  const hints: InternalHint[] = [];

  function collect(node: ReactNode) {
    if (!isValidElement(node)) return;
    const props = node.props as any;

    if (typeof props.number !== "undefined") {
      hints.push({
        content: props.children,
        number: props.number,
      });
    }

    Children.forEach(props.children, collect);
  }

  childrenArray.forEach(collect);

  return {
    id,
    label,
    prompt,
    question,
    hints,
    solution,
    cas,
  };
}

/* -------------------------------------------------------
 * MAIN COMPONENT
 * ----------------------------------------------------- */

function InteractiveExerciseBase({
                                   title,
                                   storageKey: storageKeyProp,
                                   children,
                                 }: InteractiveExerciseProps) {
  const allChildren = Children.toArray(children);

  // Intro = first element w/o id
  const introElement = allChildren.find(
      (c): c is React.ReactElement<IntroProps> =>
          isValidElement(c) && !("id" in (c.props as any)),
  );

  const intro = introElement?.props.children;

  // Tasks
  const taskElements = allChildren.filter(
      (c): c is React.ReactElement<TaskProps> =>
          isValidElement(c) && "id" in (c.props as any),
  );

  const tasks = taskElements.map(extractTaskFromElement);

  /* STATE ------------------------------------------------------- */

  const [index, setIndex] = useState(0);
  const [shownHints, setShownHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const storageKey =
      storageKeyProp ??
      `interactive-exercise:${title ?? "default"}:${tasks
      .map((t) => t.id)
      .join(",")}`;

  const persistedRef = useRef<PersistedState | null>(null);

  /* -------------------------------------------------------
   * LOAD STORAGE
   * ----------------------------------------------------- */

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!tasks.length) {
      setHydrated(true);
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) {
        setIndex(0);
        setShownHints(0);
        setShowSolution(false);
        setHydrated(true);
        return;
      }

      const parsed = JSON.parse(raw) as PersistedState;
      const safeIndex = Math.min(
          Math.max(parsed.index ?? 0, 0),
          tasks.length - 1,
      );

      persistedRef.current = parsed;
      const initialTask = tasks[safeIndex];
      const saved = parsed.tasks?.[initialTask.id];

      setIndex(safeIndex);
      setShownHints(saved?.shownHints ?? 0);
      setShowSolution(saved?.showSolution ?? false);
    } catch {
      /* ignore */
    } finally {
      setHydrated(true);
    }
  }, [storageKey, tasks.length]);

  /* -------------------------------------------------------
   * SAVE STORAGE
   * ----------------------------------------------------- */

  useEffect(() => {
    if (!hydrated) return;
    if (!tasks.length) return;

    const currentTask = tasks[index];
    if (!currentTask) return;

    const prev: PersistedState =
        persistedRef.current ?? ({index, tasks: {}} as PersistedState);

    const next: PersistedState = {
      index,
      tasks: {
        ...prev.tasks,
        [currentTask.id]: {
          shownHints,
          showSolution,
        },
      },
    };

    persistedRef.current = next;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, [index, shownHints, showSolution, hydrated, storageKey, tasks.length]);

  /* -------------------------------------------------------
   * NAVIGATION
   * ----------------------------------------------------- */

  function loadTask(n: number) {
    const clamped = Math.min(Math.max(n, 0), tasks.length - 1);
    const t = tasks[clamped];
    const saved = persistedRef.current?.tasks?.[t.id];

    setIndex(clamped);
    setShownHints(saved?.shownHints ?? 0);
    setShowSolution(saved?.showSolution ?? false);
  }

  const safeIndex = Math.min(Math.max(index, 0), tasks.length - 1);
  const task = tasks[safeIndex];
  const maxHints = task.hints.length;

  /* -------------------------------------------------------
   * RENDER
   * ----------------------------------------------------- */

  if (!tasks.length) {
    return (
        <Card
            className="mx-auto mt-8 max-w-3xl rounded-2xl border border-default-200/70 bg-content1/80 p-6 shadow-lg backdrop-blur-sm dark:border-default-200/40 dark:bg-content1/20">
          <p className="text-sm text-foreground/70 dark:text-foreground/80">
            Keine Aufgaben gefunden.
          </p>
        </Card>
    );
  }

  return (
      <Card
          className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-default-200/70 bg-content1/80 p-6 shadow-lg backdrop-blur-sm dark:border-default-200/40 dark:bg-content1/20">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {task.label && (
                <Chip size="sm" variant="primary" color="default">
                  {task.label}
                </Chip>
            )}

            {task.cas && (
                <Chip
                    size="sm"
                    variant="secondary"
                    color="success"
                    className="uppercase tracking-wide text-[10px]"
                >
                  CAS
                </Chip>
            )}
          </div>

          <Chip
              size="sm"
              variant="soft"
              color="accent"
              className="dark:bg-default/20 dark:text-foreground-500"
          >
            {safeIndex + 1}/{tasks.length} Teilaufgaben
          </Chip>
        </div>

        {/* BODY */}
        <div
            className="mt-4 space-y-4 rounded-2xl border border-dashed border-default-200 bg-content2/70 p-5 dark:border-default-200/40 dark:bg-default/10">
          {/* Intro & Prompt */}
          {(intro || task.prompt) && (
              <div
                  className="pl-4 border-l-2 border-green-300/50 text-foreground/80 text-[15px] dark:border-green-900/70 dark:text-foreground/80">
                {intro}
                {task.prompt}
              </div>
          )}

          {/* QUESTION */}
          {task.question && (
              <div
                  className="rounded-lg border border-green-200 bg-green-50/40 px-3 py-2 dark:border-green-900 dark:bg-green-950/40">
                <div className="text-[15px]">{task.question}</div>
              </div>
          )}

          {/* TIPPS */}
          {maxHints > 0 && (
              <div className="space-y-3">
                <Button
                    size="sm"
                    variant="secondary"
                    onPress={() =>
                        setShownHints((h) => Math.min(h + 1, maxHints))
                    }
                    isDisabled={shownHints >= maxHints}
                >
                  {shownHints === 0 ? "Tipp anzeigen" : "Nächster Tipp"}
                </Button>

                {shownHints > 0 && (
                    <div
                        className="pl-3 border-l-2 border-green-200 space-y-2 dark:border-green-900/80">
                      {task.hints.slice(0, shownHints).map((hint, i) => (
                          <div
                              key={i}
                              className="bg-default-100/80 dark:bg-default/10 rounded-lg px-3 py-2"
                          >
                            <div
                                className="text-[11px] uppercase font-semibold text-foreground/50 dark:text-foreground/60">
                              Tipp {hint.number ?? i + 1}
                            </div>

                            <div className="mt-1 text-[14px]">{hint.content}</div>
                          </div>
                      ))}
                    </div>
                )}
              </div>
          )}

          {/* LÖSUNG */}
          {task.solution && (
              <div className="space-y-2">
                <Button
                    size="sm"
                    variant={showSolution ? "danger-soft" : "danger"}
                    onPress={() => setShowSolution((v) => !v)}
                >
                  {showSolution ? "Lösung ausblenden" : "Lösung anzeigen"}
                </Button>

                {showSolution && (
                    <div
                        className="rounded-xl bg-linear-to-r from-emerald-50 to-sky-50 px-3 py-3 dark:from-emerald-950/60 dark:to-sky-950/40">
                      <div
                          className="text-[11px] uppercase font-semibold text-emerald-700 dark:text-emerald-300">
                        Musterlösung
                      </div>
                      <div className="mt-1 text-[15px]">{task.solution}</div>
                    </div>
                )}
              </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between mt-4">
        <span className="text-[11px] text-foreground/50 dark:text-foreground/60">
          {safeIndex + 1}/{tasks.length} Teilaufgaben
        </span>

          <div className="flex gap-2">
            {safeIndex > 0 && (
                <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => loadTask(index - 1)}
                >
                  Zurück
                </Button>
            )}

            {safeIndex < tasks.length - 1 && (
                <Button
                    size="sm"
                    onPress={() => loadTask(index + 1)}
                >
                  Nächste Teilaufgabe
                </Button>
            )}

            {safeIndex === tasks.length - 1 && (
                <Button size="sm" variant="secondary" isDisabled>
                  Fertig
                </Button>
            )}
          </div>
        </div>
      </Card>
  );
}

/* -------------------------------------------------------
 * EXPORTS
 * ----------------------------------------------------- */

export const InteractiveExercise = Object.assign(InteractiveExerciseBase, {
  Intro,
  Task,
}) as InteractiveExerciseComponent;

export const InteractiveExerciseIntro = Intro;
export const InteractiveExerciseTask = Task;
export const InteractiveExerciseTaskPrompt = TaskPrompt;
export const InteractiveExerciseTaskQuestion = TaskQuestion;
export const InteractiveExerciseTaskHints = TaskHints;
export const InteractiveExerciseTaskHint = TaskHint;
export const InteractiveExerciseTaskSolution = TaskSolution;
