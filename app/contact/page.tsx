"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    (e.currentTarget as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 4500);
  }

  return (
    <div className="container py-20 lg:py-28">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="mt-3 font-display text-fluid-3xl leading-[0.95]">
          On répond
          <br />
          <span className="text-bone-400">en 24h max.</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <Reveal direction="up" className="lg:col-span-7">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nom" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Sujet" name="subject" required />
            <Textarea label="Message" name="message" rows={6} required />

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" disabled={status === "loading"}
                className={cn("btn-primary", status === "loading" && "opacity-60")}>
                {status === "loading" ? "Envoi…" : "Envoyer →"}
              </button>
              {status === "success" && (
                <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  className="font-display text-xs uppercase tracking-widest-2 text-accent">
                  ✓ Message envoyé.
                </motion.span>
              )}
            </div>
          </form>
        </Reveal>

        <aside className="lg:col-span-5">
          <Reveal direction="right">
            <div className="border border-white/[0.08] p-6">
              <p className="eyebrow">Email direct</p>
              <a href={`mailto:${siteConfig.contact.email}`} className="mt-2 block font-display text-lg uppercase hover:text-accent">
                {siteConfig.contact.email}
              </a>
            </div>
            <div className="mt-4 border border-white/[0.08] p-6">
              <p className="eyebrow">Réseaux</p>
              <div className="mt-3 flex flex-col gap-2">
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="font-display text-sm uppercase tracking-widest-2 hover:text-accent">
                  Instagram — {siteConfig.socials.instagramHandle}
                </a>
                <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="font-display text-sm uppercase tracking-widest-2 hover:text-accent">
                  TikTok — {siteConfig.socials.tiktokHandle}
                </a>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-[10px] uppercase tracking-widest-2 text-bone-400">{label}</span>
      <input type={type} name={name} required={required}
        className="border-b border-white/15 bg-transparent py-3 placeholder:text-bone-400 focus:border-bone-100 focus:outline-none" />
    </label>
  );
}

function Textarea({ label, name, rows = 4, required }: { label: string; name: string; rows?: number; required?: boolean }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-[10px] uppercase tracking-widest-2 text-bone-400">{label}</span>
      <textarea name={name} rows={rows} required={required}
        className="resize-none border border-white/15 bg-transparent p-3 placeholder:text-bone-400 focus:border-bone-100 focus:outline-none" />
    </label>
  );
}
