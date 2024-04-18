import { memo } from "react";
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

export type ConditionBuilderProps = {
  conditions?: ConditionType[];
  renderConditionField?: (fieldProp: ConditionType) => React.ReactNode;
};

export const ConditionBuilderInner: React.FC = memo(() => {
  const { state } = useConditionBuilderStore();
  return (
    <div className={classNames(styles.container)}>
      {state.conditions?.map((condition) => {
        if (condition.conjunction) {
          return (
            <Group key={condition.key} data={condition} hoverAble={false} />
          );
        }
        return <Item key={condition.key} data={condition} />;
      })}
    </div>
  );
});

export const ConditionBuilder: React.FC<ConditionBuilderProps> = memo(
  (props) => {
    return (
      <ConditionBuilderProvider
        conditions={props.conditions}
        renderConditionField={props.renderConditionField}
      >
        <HoveringProvider>
          <ConditionBuilderInner />
        </HoveringProvider>
      </ConditionBuilderProvider>
    );
  }
);
