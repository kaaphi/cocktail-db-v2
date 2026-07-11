import { createTheme, NavLink } from "@mantine/core";

export const theme = createTheme({
    components: {
        NavLink: NavLink.extend({
            styles: {
                label: {
                    fontSize: 'var(--mantine-font-size-lg)',
                }
            }
        })
    },
    headings: {
        fontFamily: "Alegreya, serif",
    }
})