import React, { useState } from "react";
import constate from "constate";
import { useMemoizedFn } from "ahooks";
import { useImmerReducer } from "use-immer";

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
  renderConditionField?: (
    fieldProp: ConditionType,
    indexKey: string
  ) => React.ReactNode;
};

/**
 * Reducer Action
 */
type ConditionBuilderAction =
  // todo: 更新field数据
  | { type: "RESET"; payload?: ConditionBuilderState }
  | { type: "ADD_CONDITION"; payload: ConditionType }
  | { type: "DELETE_CONDITION"; payload: ConditionType }
  | { type: "ADD_CONDITION_GROUP"; payload: ConditionType }
  | { type: "DELETE_CONDITION_GROUP"; payload: ConditionType };
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
  draftState: ConditionBuilderState,
  action: ConditionBuilderAction
) {
  console.log("🚀 ~ action:", action);
  return draftState;
}
// initialState就是外部传进来的数据
function useConditionBuilderHook(initialState?: ConditionBuilderState) {
  const [state, dispatch] = useImmerReducer(
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
