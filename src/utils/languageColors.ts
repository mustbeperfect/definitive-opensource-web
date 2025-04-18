
export interface LanguageColor {
    color: string;
    name: string;
}

export const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Rust: '#dea584',
    Dart: '#00B4AB',
    Vue: '#41b883',
    default: '#FFFFFF'
};

export function getLanguageColor(language: string | null | undefined): string {
    if (!language) return languageColors.default;
    return languageColors[language] || languageColors.default;
}