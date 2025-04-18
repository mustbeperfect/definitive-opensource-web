<!-- components/CategorySidebar.vue -->
<template>
  <div>
    <div v-if="loading">Loading categories...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <ul>
        <li
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="{ active: selectedCategoryId === category.id }"
            class="text-xs text-gray9 mb-3"
        >
          <div class="flex justify-between cursor-pointer">
            <div class="flex gap-3">
              <input id="default-checkbox" type="checkbox" value="" class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
              <div>{{ category.name }}</div>
            </div>
            <div class="w-6 flex items-center justify-center  bg-gray3 rounded-sm text-[10px] text-gray-300">{{ category.numApps}}</div>
          </div>
          <ul v-if="selectedCategoryId === category.id" class="py-2 cursor-pointer">
            <li
                v-for="subcategory in getSubcategoriesForCategory(category.id)"
                :key="subcategory.id"
                @click.stop="selectSubcategory(subcategory.id)"
                :class="{ active: selectedSubcategoryId === subcategory.id }"
                class="ml-2 mb-2"
            >
              {{ subcategory.name }} {{ subcategory.numApps}}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Category, Subcategory, Application } from '~/src/types/Application';

const props = defineProps<{
  applications: Application[];
  categories: Category[];
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: 'filter', categoryId: string | null, subcategoryId: string | null): void;
}>();

const selectedCategoryId = ref<string | null>(null);
const selectedSubcategoryId = ref<string | null>(null);

const getSubcategoriesForCategory = (categoryId: string): Subcategory[] => {
  return props.subcategories?.filter(sub => sub.parent === categoryId) ?? [];
};

const selectCategory = (categoryId: string) => {
  if (selectedCategoryId.value === categoryId) {
    selectedCategoryId.value = null;
    selectedSubcategoryId.value = null;
    emit('filter', null, null);
  } else {
    selectedCategoryId.value = categoryId;
    selectedSubcategoryId.value = null;
    emit('filter', categoryId, null);
  }
};

const getSubcategories = (categoryId: string): Subcategory[] => {
  return props.subcategories.filter(subcat => subcat.parent === categoryId);
};

const selectSubcategory = (subcategoryId: string) => {
  if (selectedSubcategoryId.value === subcategoryId) {
    selectedSubcategoryId.value = null;
    emit('filter', selectedCategoryId.value, null);
  } else {
    selectedSubcategoryId.value = subcategoryId;
    emit('filter', selectedCategoryId.value, subcategoryId);
  }
};

</script>