<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PanelMenu from 'primevue/panelmenu';
import type { AppMenuItem } from '@/types/layout';

const route = useRoute();
const expandedKeys = ref({});

const menuList: AppMenuItem[] = [
  { key: 'M000', label: '대시보드', to: '/' },
  {
    key: 'C001',
    label: '관리1',
    icon: 'pi pi-file-edit',
    items: [
      { key: 'M001', label: '샘플1', to: '/SMP1' },
      { key: 'M002', label: '샘플2', to: '/SMP2' },
    ],
  },
  {
    key: 'C002',
    label: '관리2',
    icon: 'pi pi-briefcase',
    items: [
      { key: 'M003', label: '샘플3', to: '/SMP3' },
      { key: 'M004', label: '샘플4', to: '/SMP4' },
      { key: 'M005', label: '샘플5', to: '/SMP5' },
    ],
  },
];

const addMenuItem = (menu: AppMenuItem) => {
  const menuItem: AppMenuItem = { key: menu.key, label: menu.label };
  if (menu.to) {
    menuItem.to = menu.to;
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

const syncMenuWithRoute = () => {
  menuItems.forEach((item) => {
    if (item.items) {
      // 자식 메뉴 중에 현재 경로와 일치하는 항목이 있는지 확인
      const hasActiveChild = item.items.some((child) => child.to === route.path);
      if (hasActiveChild) {
        expandedKeys.value = { [item.key!]: true };
      }
    }
  });
};

onMounted(syncMenuWithRoute);
watch(() => route.path, syncMenuWithRoute);
</script>

<template>
  <div class="side-menu mt-2 px-1 space-y-0.5">
    <PanelMenu :model="menuItems" v-model:expanded-keys="expandedKeys" class="w-full">
      <template #item="{ item, active }">
        <router-link
          v-if="item.to"
          :to="item.to"
          custom
          v-slot="{ navigate, href, isActive, isExactActive }"
        >
          <a
            :href="href"
            @click="navigate"
            class="p-panelmenu-item-link"
            :class="{ 'router-link-active': isActive, 'router-link-exact-active': isExactActive }"
          >
            <i :class="item.icon"></i>
            <span class="p-panelmenu-item-label">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else class="p-panelmenu-item-link" :href="item.url">
          <span v-if="item.icon" :class="[item.icon, 'p-panelmenu-item-icon']"></span>
          <span class="p-panelmenu-item-label">{{ item.label }}</span>
          <span
            v-if="item.items"
            :class="[active ? 'pi pi-angle-down' : 'pi pi-angle-right', 'p-panelmenu-icon mr-2']"
          >
          </span>
        </a>
      </template>
    </PanelMenu>
  </div>
</template>
