import { Link, useSearchParams } from "react-router";
import { cocktails_db } from "./models";
import { Anchor, Stack, Table, Title } from "@mantine/core";

export const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase()

    if (!query) {
        return <Title>Invalid Search</Title>
    }

    const results = Object.entries(cocktails_db).filter(([, cocktail]) => {
        return cocktail.name.toLowerCase().indexOf(query) >= 0 
        || cocktail.recipeElements.find((e) => e.ingredient.toLowerCase().indexOf(query) >= 0 )
    })

    return (
        <Stack>
            <Title>“{searchParams.get("q")}”</Title>
            <Table>
                <Table.Tbody>
                    {results.map(([cocktailKey, cocktail]) =>
                        <Table.Tr key={cocktailKey}>
                            <Table.Td><Anchor p="xs" display="block" component={Link} to={`/cocktail/${cocktailKey}`}>{cocktail.name}</Anchor></Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </Stack>
    )
}