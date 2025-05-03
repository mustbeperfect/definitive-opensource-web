
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

export interface AttributeTag {
    emoji: string;
    id: string;
    description: string;
}

export interface PropertyTag {
    name: string;
    id: string;
}

export interface Tag {
    emoji: string;
    id: string;
    description: string;
    isProperty?: boolean;
    name?: string;
    numApps?: number;
}

export interface TagsData {
    attributes: AttributeTag[];
    properties: PropertyTag[];
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
