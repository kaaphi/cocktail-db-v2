import rawCocktails from "./data/cocktails.json";

export interface CocktailElement {
    amount: string,
    unit: string,
    ingredient: string,
    note?: string | null,
    isBase: boolean
}

export interface Cocktail {
    name: string,
    instructions: string,
    reference?: string | null,
    referenceDetail?: string | null,
    indexElements: boolean,
    tags: string[],
    recipeElements: CocktailElement[]
}

export const cocktails_db: Record<string, Cocktail> = rawCocktails;