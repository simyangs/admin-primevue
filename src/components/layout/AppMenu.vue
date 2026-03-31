<script setup lang="ts">
import { ref } from 'vue';
import PanelMenu from 'primevue/panelmenu';
import { useTabStore } from '@/stores/useTabStore';
import type { AppMenuItem, ExpandedKeys } from '@/types/layout';

const tabStore = useTabStore();
const expandedKeys = ref<ExpandedKeys>({});
const menuList: AppMenuItem[] = [
  { key: 'M000', label: '대시보드', path: '/' },
  { key: 'C001', label: '관리1', items: [{ key: 'M001', label: '샘플1', path: '/SMP0001' }] },
  { key: 'C002', label: '관리2', items: [{ key: 'M002', label: '샘플2', path: '/SMP0002' }] },
  { key: 'M003', label: '샘플3', path: '/SMP0003' },
  { key: 'M004', label: '샘플3', path: '/SMP0004' },
  { key: 'M005', label: '샘플3', path: '/SMP0005' },
  { key: 'M006', label: '샘플3', path: '/SMP0006' },
  { key: 'M007', label: '샘플3', path: '/SMP0007' },
  { key: 'M008', label: '샘플3', path: '/SMP0008' },
  { key: 'M009', label: '샘플3', path: '/SMP0009' },
  { key: 'M010', label: '샘플3', path: '/SMP0010' },
  { key: 'M011', label: '샘플3', path: '/SMP0011' },
  { key: 'M012', label: '샘플3', path: '/SMP0012' },
  { key: 'M013', label: '샘플3', path: '/SMP0013' },
  { key: 'M014', label: '샘플3', path: '/SMP0014' },
  { key: 'M015', label: '샘플3', path: '/SMP0015' },
];

const addMenuItem = (menu: AppMenuItem) => {
  const menuItem: AppMenuItem = { key: menu.key, label: menu.label };
  if (menu.key && menu.path) {
    menuItem.command = () => {
      tabStore.addTab({
        id: menu.key!,
        title: menu.label,
        path: menu.path!,
      });
    };
  } else if (menu.items) {
    const subItems: AppMenuItem[] = [];
    for (const subItem of menu.items) {
      subItems.push(addMenuItem(subItem));
    }
    menuItem.items = subItems;
  }
  return menuItem;
};

const menuItems: AppMenuItem[] = [];
for (const item of menuList) {
  menuItems.push(addMenuItem(item));
}
</script>

<template>
    <div class="layout-menu">
        <PanelMenu :model="menuItems" v-model:expanded-keys="expandedKeys" class="w-full" />
    </div>
</template>