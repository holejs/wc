import { TemplateResult, render } from "lit";

export interface VElement {
  tag: keyof HTMLElementTagNameMap;
  props: Record<string, string>;
  children: (VNode | string)[];
}

export type VNode = VElement | string

export function _createElement (vnode: VNode | string) {
  if (typeof vnode === 'string') return document.createTextNode(vnode)

  const $node = document.createElement(vnode.tag)

  Object.keys(vnode.props).forEach((key) => {
    $node.setAttribute(key, vnode.props[key])
  });

  (vnode.children || []).forEach((vchild) => {
    $node.appendChild(_createElement(vchild))
  })

  return $node
}

export const _query = (query: string) => document.querySelector(query)

export const _render = (template: TemplateResult) => render(template, document.body)
