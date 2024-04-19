import constate from "constate";
import React, { useState } from "react";
import { useMemoizedFn } from "ahooks";
import { useImmerReducer } from "use-immer";
import { generateKey } from "./helper.ts";

export type ConditionType = {
  key: React.Key;
  conjunction?: "or" | "and";
  children?: ConditionType[];
  // todo: 请自行扩展字段
};

/**
 * Reducer State
 */
export type ConditionBuilderState = {
  conditions: ConditionType[];
  renderConditionField?: (
    fieldProp: ConditionType,
    indexedKey: string
  ) => React.ReactNode;
};

export type ConditionTypeWithIndexedKey = ConditionType & {
  indexedKey: string;
};

/**
 * Reducer Action
 */
type ConditionBuilderAction =
  // todo: 更新field数据
  | { type: "RESET"; payload?: ConditionBuilderState }
  | { type: "CHANGE_CONJUNCTION"; payload: ConditionTypeWithIndexedKey }
  | { type: "ADD_CONDITION"; payload: ConditionTypeWithIndexedKey }
  | { type: "DELETE_CONDITION"; payload: ConditionTypeWithIndexedKey }
  | { type: "ADD_CONDITION_GROUP"; payload: ConditionTypeWithIndexedKey }
  | { type: "DELETE_CONDITION_GROUP"; payload: ConditionTypeWithIndexedKey };

/**
 * Reducer Initialize Function
 * @param initialState
 * @returns
 */
export function initState(initialState?: ConditionBuilderState) {
  return initialState ?? { conditions: [] };
}

function getSplitIndexedKeys(indexedKey: string) {
  return indexedKey.split("-").map((e) => parseInt(e, 10));
}

function getNode(
  conditions: ConditionType[],
  indexedKey: string
): ConditionType | undefined {
  const splitIndexedKeys = getSplitIndexedKeys(indexedKey);
  let record: ConditionType | undefined = conditions[splitIndexedKeys[0]];
  for (let i = 1, len = splitIndexedKeys.length; i < len; i++) {
    if (record.children) record = record.children?.[splitIndexedKeys[i]];
  }
  return record;
}

/**
 * Reducer Function
 * @param draftState
 * @param action
 * @returns
 */
export function ConditionBuilderReducer(
  draftState: ConditionBuilderState,
  action: ConditionBuilderAction
) {
  switch (action.type) {
    case "ADD_CONDITION": {
      const record = getNode(draftState.conditions, action.payload.indexedKey);
      record?.children?.push({
        key: generateKey(),
      });
      break;
    }
    case "ADD_CONDITION_GROUP": {
      const record = getNode(draftState.conditions, action.payload.indexedKey);
      record?.children?.push({
        key: generateKey(),
        conjunction: "and",
        children: [
          {
            key: generateKey(),
          },
        ],
      });
      break;
    }
    case "DELETE_CONDITION": {
      const parent = getNode(
        draftState.conditions,
        action.payload.indexedKey.slice(0, action.payload.indexedKey.length - 2)
      );
      const key = action.payload.key;
      if (parent)
        parent.children = parent.children?.filter(
          (item) => !(item.key === key)
        );
      break;
    }
    case "DELETE_CONDITION_GROUP": {
      const parent = getNode(
        draftState.conditions,
        action.payload.indexedKey.slice(0, action.payload.indexedKey.length - 2)
      );
      const key = action.payload.key;
      if (parent)
        parent.children = parent.children?.filter(
          (item) => !(item.key === key)
        );
      break;
    }
    case "CHANGE_CONJUNCTION": {
      const record = getNode(draftState.conditions, action.payload.indexedKey);
      if (record)
        record.conjunction = record.conjunction === "and" ? "or" : "and";
      break;
    }
    case "RESET":
      draftState = initState(action.payload);
      break;
    default:
      break;
  }
}

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
  useDispatch,
  useRenderField,
] = constate(
  useConditionBuilderHook,
  (value) => value,
  (value) => value.dispatch,
  (value) => value.renderField
);

function useHoveringHook() {
  return useState<React.Key>();
}

export const [HoveringProvider, useHoveringStore] = constate(useHoveringHook);
