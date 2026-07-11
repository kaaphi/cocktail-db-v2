import { createTheme, NavLink } from "@mantine/core";

export const theme = createTheme({
    components: {
        NavLink: NavLink.extend({
            styles: {
                label: {
                    fontFamily: "Alegreya, serif",
                    fontSize: 'var(--mantine-font-size-xl)',
                }
            }
        })
    },
    headings: {
        fontFamily: "Alegreya, serif",
    }
})