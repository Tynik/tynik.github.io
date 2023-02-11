import React from 'react';
import type {
  ContentBlock,
  ContentState,
  SelectionState,
  DraftStyleMap,
  DraftInlineStyle,
} from 'draft-js';
import Immutable from 'immutable';

type BaseBlockRendererProps = {
  setEditorReadOnly: (state: boolean) => void;
  onUpdateContent: (contentState: ContentState) => void;
};

export type BlockRenderer<Props = any> = {
  component: React.JSXElementConstructor<Props>;
  editable: boolean;
  props: BaseBlockRendererProps;
} | null;

export type BlockRendererComponent<Props> = {
  contentState: ContentState;
  block: ContentBlock;
  blockStyleFn: (block: ContentBlock) => string;
  customStyleFn:
    | ((style: DraftInlineStyle, block: ContentBlock) => React.CSSProperties)
    | undefined;
  customStyleMap: DraftStyleMap;
  decorator: null;
  direction: 'LTR' | 'RTL' | 'NEUTRAL';
  forceSelection: boolean;
  offsetKey: string;
  preventScroll: undefined;
  selection: SelectionState;
  tree: Immutable.List<any>;
  blockProps: Props;
};

export type ActiveBlockRendererComponent<Props = unknown> = BlockRendererComponent<
  BaseBlockRendererProps & Props
>;

type UpdateEntityMode = 'hard' | 'soft';

export type OnUpdateEntityDateHandler<Props extends Record<string, any> = Record<string, unknown>> =
  (data: Partial<Props>, mode?: UpdateEntityMode) => void;

export type ActiveEntityComponent<Props extends Record<string, any> = Record<string, unknown>> = {
  setEditorReadOnly: (state: boolean) => void;
  onUpdate: OnUpdateEntityDateHandler<Props>;
} & Props;
