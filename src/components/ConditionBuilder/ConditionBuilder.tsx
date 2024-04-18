import { memo } from "react";
import {
  ConditionBuilderContext,
  ConditionType,
  useConditionBuilderStore,
} from "./Context";
import styles from "./index.module.less";
import classNames from "classnames";
import { Group } from "./Group";
import { Item } from "./Item";

export type ConditionBuilderProps = {
  conditions?: ConditionType[];
};

export const ConditionBuilderInner: React.FC = memo(() => {
  const { state } = useConditionBuilderStore();
  return (
    <div className={classNames(styles.container)}>
      {state.conditions?.map((condition) => {
        if (condition.conjunction) {
          return <Group key={condition.key} data={condition} />;
        }
        return <Item key={condition.key} data={condition} />;
      })}
    </div>
  );
});

export const ConditionBuilder: React.FC<ConditionBuilderProps> = memo(
  (props) => {
    return (
      <ConditionBuilderContext conditions={props.conditions}>
        <ConditionBuilderInner />
      </ConditionBuilderContext>
    );
  }
);
