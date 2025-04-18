
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
}

export interface Subcategory {
    name: string;
    id: string;
    parent: string;
    description: string;
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