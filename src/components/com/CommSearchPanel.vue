<script setup lang="ts">
import { ref } from 'vue';

interface CommSearchPanelProps {
  collapsed?: boolean;
}
const isExpanded = ref(false);
defineProps<CommSearchPanelProps>();
</script>
<template>
  <section v-if="collapsed" class="search-section-collapsed">
    <div class="search-content">
      <div
        :class="[
          'search-flow-wrapper flex flex-wrap items-center gap-x-8 gap-y-4 item-start',
          isExpanded ? 'expanded' : 'collapsed',
        ]"
      >
        <slot />
      </div>
    </div>

    <div class="search-actions-collapsed">
      <button @click="isExpanded = !isExpanded" class="btn-toggle shadow-sm">
        <i
          :class="['pi mr-1.5', isExpanded ? 'pi-chevron-up' : 'pi-chevron-down']"
          style="font-size: 8px"
        ></i>
        <span v-if="isExpanded">접기</span>
        <span v-else>더보기</span>
      </button>
      <div class="search-action-group">
        <slot name="actions" />
      </div>
    </div>
  </section>
  <section v-else class="search-section flex flex-wrap items-center gap-x-8 gap-y-4 item-start">
    <slot />

    <div class="search-actions">
      <slot name="actions" />
    </div>
  </section>
</template>
