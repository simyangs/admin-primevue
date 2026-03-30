import type { Component } from 'vue';
import type { MenuItem, MenuItemCommandEvent } from 'primevue/menuitem';

// 탭의 고유 ID 타입
export type TabId = string;

// 멀티탭 구성을 위한 인터페이스
export interface AppTab {
  id: TabId;
  title: string;
  path: string;
  componentName?: string;
}

// 2레벨 트리를 위한 사이드 메뉴 인터페이스
export interface AppMenuItem extends Omit<MenuItem, 'items' | 'command'> {
  key?: string;
  label: string;
  icon?: string;
  path?: string;
  items?: AppMenuItem[]; // 재귀적 선언으로 2레벨 보장
  command?: (event: MenuItemCommandEvent) => void;
}

export type ExpandedKeys = Record<string, boolean>;
