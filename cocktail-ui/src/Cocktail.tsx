import { useParams } from "react-router";
import { cocktails_db } from "./models"
import { Stack, Table, Text, Title } from "@mantine/core";

const Amount = ({amount}:{amount : string}) => {
    const matches = amount.match(/(\d+)?\s*(\d+\/\d+)?/)
    if (matches) {
        const [,wholeNumber, fraction] = matches;
        if (wholeNumber && fraction) {
            return <>{wholeNumber} <Text span style={{fontVariantNumeric: "diagonal-fractions"}}>{fraction}</Text></>
        } else if (wholeNumber) {
            return wholeNumber
        } else {
            return <Text span style={{fontVariantNumeric: "diagonal-fractions"}}>{fraction}</Text>
        }        
    } else {
        return amount
    }
}

export const CocktailView = () => {
    const { cocktailSafeName } = useParams();

    if(!cocktailSafeName ) {
        return (
            <></>
        )
    }

    const cocktail = cocktails_db[cocktailSafeName]
    
    return (
        <Stack align="flex-start">
            <Title>{cocktail.name}</Title>
            <Table style={{ width: 'max-content', tableLayout: 'auto' }}>
                <Table.Tbody>
                    {cocktail.recipeElements.map((e) =>
                        <Table.Tr key={e.ingredient}><Table.Td><Amount amount={e.amount} /> {e.unit}</Table.Td><Table.Td>{e.ingredient}{e.note && <Text span fs="italic" size="xs"> ({e.note})</Text>}</Table.Td></Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
            <Text>{cocktail.instructions}</Text>
            {cocktail.note && <div><Text span fw={500} size="sm">NOTE: </Text><Text span>{cocktail.note}</Text></div>}
        </Stack>
    )
}