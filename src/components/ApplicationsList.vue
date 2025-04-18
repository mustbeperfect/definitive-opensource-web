
<template>
  <div>
    <div v-if="loading">Loading applications...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="filteredApplications.length === 0">No applications found matching the selected filter.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
      <div v-for="app in filteredApplications" :key="app.name">
        <ApplicationCard :application="app" :getTagEmoji="getTagEmoji" :language="getLanguageColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Application } from '~/src/types/Application';
import ApplicationCard from '~/src/components/ApplicationCard.vue';
import {getLanguageColor} from "~/src/utils/languageColors";

const props = defineProps<{
  applications: Application[];
  selectedCategoryId: string | null;
  selectedSubcategoryId: string | null;
  loading: boolean;
  error: string | null;
  getTagEmoji: (tagId: string) => string;
}>();

const filteredApplications = computed(() => {
  if (!props.selectedCategoryId && !props.selectedSubcategoryId) {
    return props.applications;
  }

  if (props.selectedSubcategoryId) {
    return props.applications.filter(app => app.category === props.selectedSubcategoryId);
  }

  return props.applications.filter(app => {
    return app.category.includes(props.selectedCategoryId || '');
  });
});
</script>

