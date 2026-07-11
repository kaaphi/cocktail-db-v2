import TitleImage from './assets/johnny_automatic_bird_on_a_cocktail.svg?react';
import { Center, Stack, Text } from '@mantine/core';

export const TitlePage = () => {
  return (
    <Center>
      <Stack>
        <TitleImage style={{ height: "19rem", width: "auto" }} />
        <Text component='a' href="https://en.wikipedia.org/wiki/Repeal_of_Prohibition_in_the_United_States" c="inherit" ta="center" style={{
          fontFamily: "Alegreya, serif",
          fontStyle: "italic",
          fontWeight: 400
        }}>December 5th, 1933</Text>
      </Stack>
    </Center>
  )
}