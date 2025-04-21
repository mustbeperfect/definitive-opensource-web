
export interface Application {
    name: string;
    description: string;
    repo_url: string;
    homepage_url: string;
    tags: string[];
    platforms: string[];
    category: string;
    stars: number;
    flags: string[];
    last_commit: string;
    language: string;
    license: string;
}

export interface ApplicationsData {
    applications: Application[];
}

export interface Category {
    name: string;
    id: string;
    description: string;
    numApps: number;
}

export interface Subcategory {
    name: string;
    id: string;
    parent: string;
    description: string;
    numApps: number;
}

export interface CategoriesData {
    categories: Category[];
    subcategories: Subcategory[];
}

export interface Tag {
    emoji: string;
    id: string;
    description: string;
}

export interface TagsData {
    tags: Tag[];
}

export interface Platform {
    name: string;
    id: string;
    numApps: number;
}

export interface PlatformsData {
    platforms: Platform[];
}

export interface License {
    name: string;
    id: string;
    numApps: number;
}

export interface LicensesData {
    licenses: License[];
}
