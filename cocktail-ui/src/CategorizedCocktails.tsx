import { Anchor, Stack, Table, Title } from "@mantine/core"
import { cocktails_db } from "./models"
import { headerHeight } from "./App"
import slugify from "typescript-slugify"
import { Link } from "react-router"

export type CategorizedCocktailsParams = {
    onlyBaseIngredients: boolean
}

type Ingredient = {
    name: string
    id: string
}

export const CategorizedCocktails = ({ onlyBaseIngredients }: CategorizedCocktailsParams) => {
    const byIngredient = Object.entries(cocktails_db).reduce<{ [key: string]: string[] }>((acc, entry) => {
        const [key, curr] = entry
        if (curr.indexElements) {
            curr.recipeElements.forEach((e) => {
                if (!onlyBaseIngredients || e.isBase) {
                    if (!acc[e.ingredient]) {
                        acc[e.ingredient] = []
                    }
                    acc[e.ingredient].push(key)
                }
            })
        }
        return acc;
    }, {})

    Object.values(byIngredient).forEach((v) => v.sort)
    const sortedIngredients = Object.keys(byIngredient).sort().map<Ingredient>((ingredient) => { return {
        name: ingredient,
        id: slugify(ingredient),
    }})

    return (
        <Stack>
            <Title>{onlyBaseIngredients ? "Base Ingredients" : "All Ingredients"}</Title>
            <Table>
                <Table.Tbody>
                    {sortedIngredients.map((ingredient) => 
                <Table.Tr key={ingredient.id}><Table.Td><Anchor href={`#${ingredient.id}`}>{ingredient.name}</Anchor></Table.Td></Table.Tr>
            )}
                </Table.Tbody>
            </Table>
            {
                sortedIngredients.map((ingredient) => <section key={ingredient.id}>
                    <Title order={3} id={ingredient.id} style={{ scrollMarginTop: `${headerHeight}px` }}>{ingredient.name}</Title>
                    <Table>
                        <Table.Tbody>
                            {byIngredient[ingredient.name].map((cocktailKey) => <Table.Tr key={cocktailKey}><Table.Td><Anchor p="xs" display="block" component={Link} to={`/cocktail/${cocktailKey}`}>{cocktails_db[cocktailKey].name}</Anchor></Table.Td></Table.Tr>)}
                        </Table.Tbody>
                    </Table>
                </section>)
            }
        </Stack>
    )
}