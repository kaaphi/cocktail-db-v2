import { NavLink, type NavLinkProps } from "@mantine/core";
import { NavLink as RouterNavLink } from 'react-router';

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

export const NavBar = ({ closeNavBar }: NavBarParams) => {
    return (
        <>
            <NavItem label="Alphabetical" link="/alphabetical" closeNavBar={closeNavBar} />
            <NavItem label="Base Ingredients" link="/base-ingredients" closeNavBar={closeNavBar} />
            <NavItem label="All Ingredients" link="/all-ingredients" closeNavBar={closeNavBar} />
        </>
    )
}