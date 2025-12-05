"use client"

import {useMemo, useState} from "react";
import {Button, Label, Modal, Slider} from "@heroui/react";
import {ChartSpline} from "lucide-react";
import {NormalDistributionGraph} from "@/components/interactive/NormalDistributionGraph";

export function NormalDistributionModal() {
  const [mu, setMu] = useState(0);
  const [sigma, setSigma] = useState(1);

  return (
      <Modal>
        {/* Trigger-Button */}
        <Button
            variant="primary"
        >
          <ChartSpline className="size-4"/>
          Interaktive Normalverteilung
        </Button>

        <Modal.Container>
          <Modal.Dialog className="w-[95vw] max-w-5xl">
          {({close}) => (
                <>
                  <Modal.CloseTrigger />

                  <Modal.Header>
                    <Modal.Icon className="bg-primary text-primary-foreground">
                      <ChartSpline className="size-5"/>
                    </Modal.Icon>
                    <Modal.Heading>Normalverteilung interaktiv</Modal.Heading>
                  </Modal.Header>

                  <Modal.Body className="space-y-6">
                    <NormalDistributionGraph mu={mu} sigma={sigma} />

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Slider für μ */}
                      <Slider
                          value={mu}
                          minValue={-2}
                          maxValue={2}
                          step={0.1}
                          onChange={(value) => {
                            if (typeof value === "number") setMu(value);
                          }}
                          formatOptions={{maximumFractionDigits: 1}}
                      >
                        <Label>Mittelwert μ</Label>
                        <Slider.Output className="text-xs text-foreground-500" />
                        <Slider.Track className="h-2 rounded-full bg-default-200">
                          <Slider.Fill className="bg-primary" />
                          <Slider.Thumb className="size-4 rounded-full bg-primary border-2 border-background" />
                        </Slider.Track>
                      </Slider>

                      {/* Slider für σ */}
                      <Slider
                          value={sigma}
                          minValue={0.5}
                          maxValue={2.5}
                          step={0.1}
                          onChange={(value) => {
                            if (typeof value === "number") setSigma(value || 0.5);
                          }}
                          formatOptions={{maximumFractionDigits: 1}}
                      >
                        <Label>Standardabweichung σ</Label>
                        <Slider.Output className="text-xs text-foreground-500" />
                        <Slider.Track className="h-2 rounded-full bg-default-200">
                          <Slider.Fill className="bg-primary" />
                          <Slider.Thumb className="size-4 rounded-full bg-primary border-2 border-background" />
                        </Slider.Track>
                      </Slider>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button variant="primary" onPress={close}>
                      Schließen
                    </Button>
                  </Modal.Footer>
                </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
  );
}