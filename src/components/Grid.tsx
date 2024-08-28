// There's no grid in Lightning, so let's pretend we know how to build one
// NOTE: currently abandoned since all navigation needs to be handled manually
//       see how Lightning does it: https://github.com/rdkcentral/solid-ui/blob/main/packages/solid/components/Row/Row.tsx

import {ElementNode, For, View} from "@lightningtv/solid";
import type {IntrinsicNodeProps} from "@lightningtv/core";
import {createEffect, createSignal} from "solid-js";

export type GridProps<T, V extends Element> = {
  items: T[];
  cellWidth: number;
  cellHeight: number;
  gap: number;
  width: number;
  render: (props: { item: T, rowIndex: number, columnIndex: number }) => V
} & IntrinsicNodeProps;

export function Grid<T, V extends Element>(props: GridProps<T, V>) {
  // we do a very primitive grouping
  // we calculate max elements per column, and group items into
  // an array of arrays of max elements
  const maxItemsPerRow = props.width / (props.cellWidth + props.gap);
  const groups: T[][] = [];

  while (props.items.length > 0) {
    groups.push(props.items.splice(0, maxItemsPerRow))
  }

  let ref!: ElementNode;

  function onFocus(this: ElementNode) {
    console.log('onfocus in grid, ', this, this.selected);
    // this.children[this.selected || 0].setFocus();
    // setColumnY(150 + (this.y || 0) * -1);
  }

  return <View forwardStates width={props.width} forwardFocus={0} onFocus={onFocus}>
    <For each={groups}>
      {(items, rowIndex) => {
        return <For each={items}>
          {(item, columnIndex) => {
            const [hasFocus, setHasFocus] = createSignal(false);
            createEffect(() => {
              console.log('hasfocus changed here', hasFocus(), ref);
            })
            return <View
                x={columnIndex() * (props.cellWidth + props.gap)}
                y={rowIndex() * (props.cellHeight + props.gap)}
                width={props.cellWidth}
                height={props.cellHeight}
                onFocusChanged={setHasFocus}
                onFocus={() => {
                  console.log('focused callback', ref);
                  return true;
                }}
                forwardFocus={0}
                ref={ref}
            >
              {props.render({item, columnIndex: columnIndex(), rowIndex: rowIndex()})}
            </View>
          }}
        </For>
      }}
    </For>
  </View>
}
