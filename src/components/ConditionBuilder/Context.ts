import React, { useReducer } from "react";
import constate from "constate";

export type ConditionType = {
  key: React.Key;
  conjunction?: "or" | "and";
  children?: ConditionType[];
};

/**
 * Reducer State
 */
export type ConditionBuilderState = {
  conditions?: ConditionType[];
};

/**
 * Reducer Action
 */
type ConditionBuilderAction = {
  type: "RESET";
  payload?: ConditionBuilderState;
};

/**
 * Reducer Initialize Function
 * @param initialState
 * @returns
 */
export function initState(initialState?: ConditionBuilderState) {
  return initialState ?? { conditions: [] };
}

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns
 */
export function ConditionBuilderReducer(
  state: ConditionBuilderState,
  action: ConditionBuilderAction
) {
  console.log("🚀 ~ action:", action);
  return state;
}

function useHook(initialState?: ConditionBuilderState) {
  const [state, dispatch] = useReducer(
    ConditionBuilderReducer,
    initialState,
    initState
  );
  return {
    state,
    dispatch,
  };
}

export const [ConditionBuilderContext, useConditionBuilderStore] =
  constate(useHook);
