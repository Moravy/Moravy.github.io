"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { answerFor } from "@/lib/qa";
import ChatTakeover from "./ChatTakeover";

export interface Turn {
  id: number;
  qaId: string; // which curated question this is (for progressive tracking)
  q: string;
  a: string;
  done: boolean;
  followups: { id: string; q: string }[];
}

type Ctx = {
  ask: (q: string) => void;
  close: () => void;
  browse: () => void;
  open: boolean;
};

const AskContext = createContext<Ctx>({
  ask: () => {},
  close: () => {},
  browse: () => {},
  open: false,
});
export const useAsk = () => useContext(AskContext);

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function AskProvider({ children }: { children: React.ReactNode }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [open, setOpen] = useState(false);
  const [browseReq, setBrowseReq] = useState(0);

  const idRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const activeRef = useRef<{ id: number; full: string } | null>(null);

  const setTurn = useCallback((id: number, patch: Partial<Turn>) => {
    setTurns((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const settle = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const a = activeRef.current;
    if (a) {
      setTurn(a.id, { a: a.full, done: true });
      activeRef.current = null;
    }
  }, [setTurn]);

  const startType = useCallback(
    (id: number, full: string) => {
      if (reducedMotion()) {
        setTurn(id, { a: full, done: true });
        return;
      }
      activeRef.current = { id, full };
      let i = 0;
      timerRef.current = window.setInterval(() => {
        i += 4;
        if (i >= full.length) {
          setTurn(id, { a: full, done: true });
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;
          activeRef.current = null;
        } else {
          setTurn(id, { a: full.slice(0, i) });
        }
      }, 12);
    },
    [setTurn]
  );

  const ask = useCallback(
    (question: string) => {
      const q = question.trim();
      if (!q) return;
      settle();

      const { id: qaId, answer: full, followups } = answerFor(q);
      const id = ++idRef.current;
      const turn: Turn = { id, qaId, q, a: "", done: false, followups };

      // first question opens a fresh thread + takes over; later ones append
      setTurns((ts) => (open ? [...ts, turn] : [turn]));
      setOpen(true);
      startType(id, full);
    },
    [open, settle, startType]
  );

  const close = useCallback(() => {
    settle();
    setOpen(false);
  }, [settle]);

  // open the takeover straight into the "browse all questions" index
  const browse = useCallback(() => {
    setOpen(true);
    setBrowseReq((n) => n + 1);
  }, []);

  // lock background scroll + Esc to exit while the takeover is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    },
    []
  );

  return (
    <AskContext.Provider value={{ ask, close, browse, open }}>
      <div className="stage" data-dimmed={open || undefined} aria-hidden={open || undefined}>
        {children}
      </div>
      <ChatTakeover open={open} browseReq={browseReq} turns={turns} onAsk={ask} onBack={close} />
    </AskContext.Provider>
  );
}
