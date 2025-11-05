import * as React from "react";
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 4000; // auto dismiss after 4s

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: React.ReactNode
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;
const genId = () => (++count % Number.MAX_SAFE_INTEGER).toString();

type Action =
  | { type: typeof actionTypes.ADD_TOAST; toast: ToasterToast }
  | { type: typeof actionTypes.UPDATE_TOAST; toast: Partial<ToasterToast> }
  | { type: typeof actionTypes.DISMISS_TOAST; toastId?: string }
  | { type: typeof actionTypes.REMOVE_TOAST; toastId?: string };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();
const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((l) => l(memoryState));
}

function addToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) return;
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) addToRemoveQueue(toastId);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id));
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          toastId === undefined || t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

type Toast = Omit<ToasterToast, "id">;

export function toast({ ...props }: Toast) {
  const id = genId();
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      open: true,
      ...props,
      onOpenChange: (open) => !open && dismiss(),
    },
  });

  return { id, dismiss };
}

export function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const idx = listeners.indexOf(setState);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return { ...state, toast, dismiss: (id?: string) => dispatch({ type: "DISMISS_TOAST", toastId: id }) };
}
