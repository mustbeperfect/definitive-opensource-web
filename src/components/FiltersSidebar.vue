
<template>
  <div class="w-3xs hybrid rounded-lg h-[calc(100vh-2.5rem)] sticky top-5 hidden md:flex md:flex-col gap-2 py-2 overflow-y-auto">
    <div class="px-3 text-gray9 text-xs font-medium">Categories</div>
    <div class="line-x"></div>
    <div v-if="loading">Loading categories...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else class="flex flex-col gap-2">
      <ul class="px-3">
        <li
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category.id)"
            :class="{ active: selectedCategoryIds.includes(category.id) }"
            class="text-xs text-gray9 mb-3 mt-1"
        >
          <div class="flex justify-between cursor-pointer">
            <div class="flex gap-3">
              <input
                  type="checkbox"
                  :checked="selectedCategoryIds.includes(category.id)"
                  class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
              <div>{{ category.name }}</div>
            </div>
            <div class="w-6 flex items-center justify-center  bg-gray3 rounded-sm text-[10px] text-gray-300">{{ category.numApps}}</div>
          </div>
          <ul v-if="selectedCategoryIds.includes(category.id)" class="py-2 cursor-pointer">
            <li
                v-for="subcategory in getSubcategoriesForCategory(category.id)"
                :key="subcategory.id"
                @click.stop="selectSubcategory(subcategory.id)"
                :class="{ active: selectedSubcategoryIds.includes(subcategory.id) }"
                class="ml-2 mb-2"
            >
              <div class="flex justify-between cursor-pointer">
                <div class="flex gap-3">
                  <input
                      type="checkbox"
                      :checked="selectedSubcategoryIds.includes(subcategory.id)"
                      class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
                  <div>{{ subcategory.name }}</div>
                </div>
                <div class="w-6 flex items-center justify-center bg-gray3 rounded-sm text-[10px] text-gray-300">{{ subcategory.numApps }}</div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="line-x"></div>
    <div class="px-3 text-gray9 text-xs font-medium">Platforms</div>
    <div class="line-x"></div>

    <div class="flex flex-col gap-2">
      <ul class="px-3">
        <li
            v-for="platform in platforms"
            :key="platform.id"
            @click="selectPlatform(platform.id)"
            :class="{ active: selectedPlatformIds.includes(platform.id) }"
            class="text-xs text-gray9 mb-3 mt-1"
        >
          <div class="flex justify-between cursor-pointer">
            <div class="flex gap-3">
              <input
                  type="checkbox"
                  :checked="selectedPlatformIds.includes(platform.id)"
                  class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
              <div>{{ platform.name }}</div>
            </div>
            <div class="w-6 flex items-center justify-center  bg-gray3 rounded-sm text-[10px] text-gray-300">{{ platform.numApps }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="line-x"></div>
    <div class="px-3 text-gray9 text-xs font-medium">Licenses</div>
    <div class="line-x"></div>

    <div class="flex flex-col gap-2">
      <ul class="px-3">
        <li
            v-for="license in licenses"
            :key="license.id"
            @click="selectLicense(license.id)"
            :class="{ active: selectedLicenseIds.includes(license.id) }"
            class="text-xs text-gray9 mb-3 mt-1"
        >
          <div class="flex justify-between cursor-pointer">
            <div class="flex gap-3">
              <input
                  type="checkbox"
                  :checked="selectedLicenseIds.includes(license.id)"
                  class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
              <div>{{ license.name }}</div>
            </div>
            <div class="w-6 flex items-center justify-center  bg-gray3 rounded-sm text-[10px] text-gray-300">{{ license.numApps }}</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="line-x"></div>
    <div class="px-3 text-gray9 text-xs font-medium">Tags</div>
    <div class="line-x"></div>

    <div class="flex flex-col gap-2">
      <ul class="px-3">
        <li
            v-for="tag in tags"
            :key="tag.id"
            @click="selectTag(tag.id)"
            :class="{ active: selectedTagIds.includes(tag.id) }"
            class="text-xs text-gray9 mb-3 mt-1"
        >
          <div class="flex justify-between cursor-pointer">
            <div class="flex gap-3">
              <input
                  type="checkbox"
                  :checked="selectedTagIds.includes(tag.id)"
                  class="appearance-none size-4 border border-gray9 bg-gray3 rounded-sm checked:bg-white">
              <div>{{ tag.emoji ? `${tag.emoji} ` : '' }}{{ tag.name || tag.description }}</div>
            </div>
            <div class="w-6 flex items-center justify-center  bg-gray3 rounded-sm text-[10px] text-gray-300">{{ tag.numApps || 0 }}</div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Category, Subcategory, Application, Platform, License, Tag } from '~/src/types/Application';

const props = defineProps<{
  applications: Application[];
  categories: Category[];
  subcategories: Subcategory[];
  platforms: Platform[];
  licenses: License[];
  tags: Tag[];
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  (e: 'filter', categoryIds: string[], subcategoryIds: string[], platformIds: string[], licenseIds: string[], tagIds: string[]): void;
}>();

const selectedCategoryIds = ref<string[]>([]);
const selectedSubcategoryIds = ref<string[]>([]);
const selectedPlatformIds = ref<string[]>([]);
const selectedLicenseIds = ref<string[]>([]);
const selectedTagIds = ref<string[]>([]);

const getSubcategoriesForCategory = (categoryId: string): Subcategory[] => {
  return props.subcategories?.filter(sub => sub.parent === categoryId) ?? [];
};

const selectCategory = (categoryId: string) => {
  const index = selectedCategoryIds.value.indexOf(categoryId);
  if (index !== -1) {
    // Remove the category if already selected
    selectedCategoryIds.value.splice(index, 1);

    // Remove any subcategories that belong to this category
    selectedSubcategoryIds.value = selectedSubcategoryIds.value.filter(
      subId => !getSubcategoriesForCategory(categoryId).some(sub => sub.id === subId)
    );
  } else {
    // Add the category if not already selected
    selectedCategoryIds.value.push(categoryId);
  }

  emit('filter', selectedCategoryIds.value, selectedSubcategoryIds.value, selectedPlatformIds.value, selectedLicenseIds.value, selectedTagIds.value);
};

const getSubcategories = (categoryId: string): Subcategory[] => {
  return props.subcategories.filter(subcat => subcat.parent === categoryId);
};

const selectSubcategory = (subcategoryId: string) => {
  const index = selectedSubcategoryIds.value.indexOf(subcategoryId);
  if (index !== -1) {
    // Remove the subcategory if already selected
    selectedSubcategoryIds.value.splice(index, 1);
  } else {
    // Add the subcategory if not already selected
    selectedSubcategoryIds.value.push(subcategoryId);

    // Make sure the parent category is selected
    const subcategory = props.subcategories.find(sub => sub.id === subcategoryId);
    if (subcategory && !selectedCategoryIds.value.includes(subcategory.parent)) {
      selectedCategoryIds.value.push(subcategory.parent);
    }
  }

  emit('filter', selectedCategoryIds.value, selectedSubcategoryIds.value, selectedPlatformIds.value, selectedLicenseIds.value, selectedTagIds.value);
};

const selectPlatform = (platformId: string) => {
  const index = selectedPlatformIds.value.indexOf(platformId);
  if (index !== -1) {
    // Remove the platform if already selected
    selectedPlatformIds.value.splice(index, 1);
  } else {
    // Add the platform if not already selected
    selectedPlatformIds.value.push(platformId);
  }

  emit('filter', selectedCategoryIds.value, selectedSubcategoryIds.value, selectedPlatformIds.value, selectedLicenseIds.value, selectedTagIds.value);
};

const selectLicense = (licenseId: string) => {
  const index = selectedLicenseIds.value.indexOf(licenseId);
  if (index !== -1) {
    // Remove the license if already selected
    selectedLicenseIds.value.splice(index, 1);
  } else {
    // Add the license if not already selected
    selectedLicenseIds.value.push(licenseId);
  }

  emit('filter', selectedCategoryIds.value, selectedSubcategoryIds.value, selectedPlatformIds.value, selectedLicenseIds.value, selectedTagIds.value);
};

const selectTag = (tagId: string) => {
  const index = selectedTagIds.value.indexOf(tagId);
  if (index !== -1) {
    // Remove the tag if already selected
    selectedTagIds.value.splice(index, 1);
  } else {
    // Add the tag if not already selected
    selectedTagIds.value.push(tagId);
  }

  emit('filter', selectedCategoryIds.value, selectedSubcategoryIds.value, selectedPlatformIds.value, selectedLicenseIds.value, selectedTagIds.value);
};

</script>
