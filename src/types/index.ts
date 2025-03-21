// Type definitions
export interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon?: string;
}

export interface NavbarProps {
    activeRoute: string;
}


export interface NavbarProps {
    activeRoute: string;
}

export interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}