import { useCallback, useReducer } from "react";

type State<T, E> = {
  result: T | null;
  loading: boolean;
  error: E | null;
};

type Action<T, E> =
  | { type: "loading" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: E };

const reducer = <T, E>(state: State<T, E>, action: Action<T, E>): State<T, E> => {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true, error: null };
    case "success":
      return { ...state, loading: false, result: action.payload };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("Unhandled action type");
  }
};

export const usePromise = <T, Args extends any[], E extends Error>(
  fn: (...args: Args) => Promise<T>
) => {
  const [state, dispatch] = useReducer(reducer, {
    result: null,
    loading: false,
    error: null,
  } as State<T, E>);

  const action = useCallback(async (...args: Args) => {
    dispatch({ type: "loading" });
    try {
      const result = await fn(...args);
      dispatch({ type: "success", payload: result });
    } catch (error) {
      dispatch({ type: "error", payload: error as E });
    }
  }, [fn]);

  return [action, state.loading, state.result, state.error] as const;
};
