import {Accordion} from "@heroui/react";


export default function TestAccordion() {
  return (
      <div className="fd-content mx-auto w-full max-w-3xl">
        <Accordion allowsMultipleExpanded className="accordion-sm rounded-2xl border border-default-200 bg-content1 shadow-sm p-0">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Getting Started
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Learn the basics of HeroUI and how to integrate it into your React project. This section
                covers installation, setup, and your first component.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Core Concepts
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Understand the fundamental concepts behind HeroUI, including the compound component
                pattern, styling with Tailwind CSS, and accessibility features.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Advanced Usage
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Explore advanced features like custom variants, theme customization, and integration
                with other libraries in your React ecosystem.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                Best Practices
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>
                Follow our recommended best practices for building performant, accessible, and
                maintainable applications with HeroUI components.
              </Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
  )
}