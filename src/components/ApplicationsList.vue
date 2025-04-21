
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
  subcategories: Subcategory[];
  selectedCategoryId: string[];
  selectedSubcategoryId: string[];
  selectedPlatformId: string[];
  selectedLicenseId: string[];
  searchText: string;
  sortOption: string;
  loading: boolean;
  error: string | null;
  getTagEmoji: (tagId: string) => string;
}>();

const filteredApplications = computed(() => {
  let filtered = props.applications;

  // Filter by subcategory (if any selected)
  if (props.selectedSubcategoryId.length > 0) {
    filtered = filtered.filter(app => 
      props.selectedSubcategoryId.some(subcatId => app.category === subcatId)
    );
  } 
  // Filter by category (if any selected and no matching subcategories)
  else if (props.selectedCategoryId.length > 0) {
    // Get all subcategories for the selected categories
    const subcatIds = props.selectedCategoryId.flatMap(catId => 
      props.subcategories?.filter(sub => sub.parent === catId).map(sub => sub.id) || []
    );

    filtered = filtered.filter(app => 
      // Match if app's category is in the selected subcategories
      subcatIds.includes(app.category)
    );
  }

  // Filter by platform (if any selected)
  if (props.selectedPlatformId.length > 0) {
    filtered = filtered.filter(app => 
      // App must have at least one platform that matches one of the selected platforms
      app.platforms.some(platform => props.selectedPlatformId.includes(platform))
    );
  }

  // Filter by license (if any selected)
  if (props.selectedLicenseId.length > 0) {
    filtered = filtered.filter(app => 
      props.selectedLicenseId.includes(app.license)
    );
  }

  // Filter by search text
  if (props.searchText.trim()) {
    const searchLower = props.searchText.toLowerCase().trim();
    filtered = filtered.filter(app => 
      app.name.toLowerCase().includes(searchLower)
    );
  }

  // Sort applications based on sortOption
  switch (props.sortOption) {
    case 'stars':
      filtered = [...filtered].sort((a, b) => b.stars - a.stars);
      break;
    case 'name_asc':
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name_desc':
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'updated':
      filtered = [...filtered].sort((a, b) => new Date(b.last_commit).getTime() - new Date(a.last_commit).getTime());
      break;
  }

  return filtered;
});
</script>
