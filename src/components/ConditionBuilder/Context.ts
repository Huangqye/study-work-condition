import React, { useReducer, useState } from "react";
import constate from "constate";
import { useMemoizedFn } from "ahooks";

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
  renderConditionField?: (fieldProp: ConditionType) => React.ReactNode;
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

function useConditionBuilderHook(initialState?: ConditionBuilderState) {
  const [state, dispatch] = useReducer(
    ConditionBuilderReducer,
    initialState,
    initState
  );

  const renderField = useMemoizedFn(
    initialState?.renderConditionField ?? (() => {})
  );

  return {
    state,
    dispatch,
    renderField: initialState?.renderConditionField ? renderField : undefined,
  };
}

export const [
  ConditionBuilderProvider,
  useConditionBuilderStore,
  useRenderField,
] = constate(
  useConditionBuilderHook,
  (value) => value,
  (value) => value.renderField
);

function useHoveringHook() {
  return useState<React.Key>();
}

export const [HoveringProvider, useHoveringStore] = constate(useHoveringHook);
