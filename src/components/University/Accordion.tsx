"use client";
import React, { useState } from "react";
import Container from "@/components/ui/Container";

export type QA = { q: string; a: string };

type Props = {
  items: QA[];
  title?: string;
};

export default function Accordion({
  items,
  title = "Frequently Asked Questions",
}: Props) {
  const [active, setActive] = useState<number | null>(0); // first open by default

  const toggle = (idx: number) =>
    setActive((cur) => (cur === idx ? null : idx));

  return (
    <section className="w-full bg-slate-50 py-10">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* Section Heading */}
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-slate-800">
            {title}
          </h2>

          {/* FAQ List */}
          <div className="mt-8 space-y-5">
            {items.map((qa, idx) => (
              <Item
                key={idx}
                {...qa}
                isOpen={active === idx}
                onToggle={() => toggle(idx)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Item({
  q,
  a,
  isOpen,
  onToggle,
}: QA & { isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-4xl",
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "transition-all duration-200",
        isOpen ? "shadow-md" : "shadow-sm",
      ].join(" ")}
    >
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left"
      >
        <span className="text-xl sm:text-xl font-semibold text-slate-800 leading-snug">
          {q}
        </span>

        {/* +/- icon */}
        <span
          aria-hidden
          className={[
            "select-none text-xl  leading-none font-bold",
            "text-red-500",
            "transition-transform duration-200",
          ].join(" ")}
        >
          {isOpen ? "–" : "+"}
        </span>
      </button>

      {/* Body */}
      <div
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="px-8 pb-6 text-base text-slate-700 leading-relaxed">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}
