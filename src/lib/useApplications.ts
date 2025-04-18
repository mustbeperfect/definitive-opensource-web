
import { ref } from 'vue';
import type { Application, ApplicationsData, CategoriesData, Category, Subcategory, Tag, TagsData } from '~/src/types/Application';

export const useData = () => {
    const applications: Ref<Application[]> = ref([]);
    const tags = ref<Tag[]>([]);
    const tagsMap = ref<Record<string, Tag>>({});
    const categories: Ref<Category[]> = ref([]);
    const subcategories: Ref<Subcategory[]> = ref([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/mustbeperfect/definitive-opensource/main';

    const fetchApplications = async () => {
        try {
            console.log("Fetching applications.");
            const response = await fetch(`${GITHUB_RAW_URL}/source/data/applications.json`);

            const data: ApplicationsData = await response.json();
            applications.value = data.applications || [];
            return data;
        }
        catch (err) {
            console.error('Error fetching applications:', err);
            error.value = err instanceof Error ? err.message : 'Unknown error occurred';
            return { applications: [] };
        }
    };

    const fetchCategories = async () => {
        try {
            console.log("Fetching categories.");
            const response = await fetch(`${GITHUB_RAW_URL}/source/data/categories.json`);

            const data: CategoriesData = await response.json();
            categories.value = data.categories || [];
            subcategories.value = data.subcategories || [];
            return data;
        } catch (err) {
            console.error('Error fetching categories:', err);
            error.value = err instanceof Error ? err.message : 'Unknown error occurred';
            return { categories: [], subcategories: [] };
        }
    };

    const fetchTags = async () => {
        try {
            console.log("Fetching tags.");
            const response = await fetch(`${GITHUB_RAW_URL}/source/data/tags.json`);

            const data: TagsData = await response.json();
            tags.value = data.tags || [];

            const map: Record<string, Tag> = {};
            data.tags.forEach(tag => {
                map[tag.id] = tag;
            });
            tagsMap.value = map;

            return data;
        } catch (err) {
            console.error('Error fetching tags:', err);
            error.value = err instanceof Error ? err.message : 'Unknown error occurred';
            return { tags: [] };
        }
    };

    const fetchData = async () => {
        loading.value = true;
        error.value = null;

        try {
            const [appsData, categoriesData, tagsData] = await Promise.all([
                fetchApplications(),
                fetchCategories(),
                fetchTags()
            ]);

            const appCountsBySubcategory: Record<string, number> = {};

            // Count apps for each subcategory
            for (const app of appsData.applications || []) {
                if (!appCountsBySubcategory[app.category]) {
                    appCountsBySubcategory[app.category] = 0;
                }
                appCountsBySubcategory[app.category]++;
            }

            // Add numApps to subcategories
            subcategories.value = (categoriesData.subcategories || []).map(subcat => ({
                ...subcat,
                numApps: appCountsBySubcategory[subcat.id] || 0
            }));

            // Build a map from subcategory ID to parent category ID
            const subcategoryToCategory: Record<string, string> = {};
            for (const subcat of subcategories.value) {
                subcategoryToCategory[subcat.id] = subcat.parent;
            }

            // Sum subcategory counts into parent categories
            const categoryAppCounts: Record<string, number> = {};
            for (const subcat of subcategories.value) {
                const parent = subcat.parent;
                if (!categoryAppCounts[parent]) {
                    categoryAppCounts[parent] = 0;
                }
                categoryAppCounts[parent] += subcat.numApps;
            }

            // Add numApps to categories
            categories.value = (categoriesData.categories || []).map(cat => ({
                ...cat,
                numApps: categoryAppCounts[cat.id] || 0
            }));

        } catch (err) {
            console.error('Error in fetchData:', err);
            error.value = err instanceof Error ? err.message : 'Unknown error fetching data';
        } finally {
            loading.value = false;
        }
    };


    const getTagEmoji = (tagId: string): string => {
        return tagsMap.value[tagId]?.emoji || tagId;
    };

    return {
        applications,
        categories,
        subcategories,
        tags,
        getTagEmoji,
        fetchTags,
        fetchData,
        loading,
        error
    };

};