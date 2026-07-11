import { Box, CloseButton, NavLink, TextInput, type NavLinkProps } from "@mantine/core";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink as RouterNavLink, useNavigate } from 'react-router';

type NavBarParams = {
    closeNavBar: () => void;
}

type NavItemProps = {
    closeNavBar: () => void;
    link?: string
} & NavLinkProps;

const NavItem = (props: NavItemProps) => {
    const { link, closeNavBar, ...others } = props;

    return (
        <NavLink
            {...others}
            renderRoot={({ className, ...others }) => (
                <RouterNavLink className={className} to={link} {...others} />
            )}
            onClick={closeNavBar}
        />
    )
}

type SearchBarProps = {
    closeNavBar: () => void;
}

const SearchBar = ({ closeNavBar }: SearchBarProps) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const query = data.get('cocktail-search')?.toString().trim();

        if (query) {
            navigate(`/search?q=${encodeURIComponent(query)}`);

            // Defer resetting the state until Mantine's click cycle finishes
            queueMicrotask(() => {
                setValue("");
            });
        }

        closeNavBar()
    };

    return (
        <Box component="form" onSubmit={handleSubmit} style={{ marginInline: "var(--mantine-spacing-xs)" }}>
            <TextInput
                name="cocktail-search"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
                rightSection={value ? (
                    <CloseButton
                        size="sm"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setValue('')}
                    />
                ) : null}
                rightSectionPointerEvents="auto"
                type="search"
                placeholder="Search"
                leftSection={<MagnifyingGlassIcon size={16} />}
            />
        </Box>
    )
}

export const NavBar = ({ closeNavBar }: NavBarParams) => {
    return (
        <>
            <NavItem label="Alphabetical" link="/alphabetical" closeNavBar={closeNavBar} />
            <NavItem label="Base Ingredients" link="/base-ingredients" closeNavBar={closeNavBar} />
            <NavItem label="All Ingredients" link="/all-ingredients" closeNavBar={closeNavBar} />
            <SearchBar closeNavBar={closeNavBar} />
        </>
    )
}