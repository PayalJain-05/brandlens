import { useEffect, useState } from 'react';

type Toast = { id: number; message: string; tone: 'default' | 'success' | 'error' };

let listeners: ((toast: Toast) => void)[] = [];
let counter = 0;

export function toast(message: string, tone: Toast['tone'] = 'default') {
  const t: Toast = { id: ++counter, message, tone };
  listeners.forEach((l) => l(t));
}

export function useToasts() {
  const [items, setItems] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (t: Toast) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, 2600);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return items;
}
