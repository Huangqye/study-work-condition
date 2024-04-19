import { memo, useMemo } from "react";
import {
  ConditionBuilderProvider,
  ConditionType,
  HoveringProvider,
  useConditionBuilderStore,
} from "./Context";
import styles from "./index.module.less";
import classNames from "classnames";
import { Group } from "./Group";
import { Item } from "./Item";
import { generateKey } from "./helper";

export type ConditionBuilderProps = {
  // 条件 / 条件组
  conditions?: ConditionType[];
  // 自定义条件  表单域/值域 渲染
  renderConditionField?: (
    fieldProp: ConditionType,
    indexKey: string
  ) => React.ReactNode;
};

export const ConditionBuilderInner: React.FC = memo(() => {
  const { state } = useConditionBuilderStore();
  return (
    <div className={classNames(styles.container)}>
      {state.conditions?.map((condition) => {
        if (condition.conjunction) {
          return (
            <Group
              indexedKey={"0"}
              key={condition.key}
              data={condition}
              hoverable={false}
            />
          );
        }
        return <Item indexedKey={"0"} key={condition.key} data={condition} />;
      })}
    </div>
  );
});

export const ConditionBuilder: React.FC<ConditionBuilderProps> = memo(
  // todo:
  // 1. 添加forwardRef, 命令式更新
  (props) => {
    const conditions = useMemo<ConditionType[]>(() => {
      return props.conditions?.length
        ? props.conditions
        : [
            {
              key: generateKey(),
              conjunction: "and",
              children: [],
            },
          ];
    }, [props.conditions]);

    return (
      <ConditionBuilderProvider
        conditions={conditions}
        renderConditionField={props.renderConditionField}
      >
        <HoveringProvider>
          <ConditionBuilderInner />
        </HoveringProvider>
      </ConditionBuilderProvider>
    );
  }
);
