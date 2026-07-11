import { Anchor, Table } from "@mantine/core"
import { cocktails_db } from "./models"
import { Link } from "react-router"

export type AlphabeticalCocktailsParams = {
    cocktailKeys?: string[]
}

export const AlphabeticalCocktails = ({cocktailKeys = Object.keys(cocktails_db)}: AlphabeticalCocktailsParams) => {
    cocktailKeys.sort()
    
    return (
        <Table>
            <Table.Tbody>
            {cocktailKeys.map((cocktailKey) => 
            <Table.Tr key={cocktailKey}>
                <Table.Td><Anchor p="xs" display="block" component={Link} to={`/cocktail/${cocktailKey}`}>{cocktails_db[cocktailKey].name}</Anchor></Table.Td>
            </Table.Tr>
            )}
            </Table.Tbody>
        </Table>
    )
}