import React, { useState } from "react";
import constate from "constate";
import { useMemoizedFn } from "ahooks";
import { useImmerReducer } from "use-immer";
import { uniqueId } from "lodash-es";

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

function getNode(conditions: ConditionType[], indexedKey: string) {
  const splitIndexedKeys = getSplitIndexedKeys(indexedKey);
  let record: ConditionType = conditions[splitIndexedKeys[0]];
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
      record.children?.push({
        key: uniqueId(),
      });
      break;
    }
    case "ADD_CONDITION_GROUP":
      return {
        ...draftState,
        // description: action.payload,
      };
      break;
    case "DELETE_CONDITION": {
      const record = getNode(
        draftState.conditions,
        action.payload.indexedKey.slice(0, action.payload.indexedKey.length - 2)
      );
      const key = action.payload.key;
      record.children = record.children?.filter((item) => !(item.key === key));
      break;
    }
    case "DELETE_CONDITION_GROUP":
      return {
        ...draftState,
        // description: action.payload,
      };
      break;
    case "CHANGE_CONJUNCTION":
      return {
        ...draftState,
        // description: action.payload,
      };
      break;
    case "RESET":
      // return initState(action.payload);
      break;
    default:
      break;
  }
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
