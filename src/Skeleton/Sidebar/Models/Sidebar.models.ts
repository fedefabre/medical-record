import { BoxProps, FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { ReactNode } from 'react';

export interface SideBarInterface {
  linkItems: LinkItemProps[];
  children?: ReactNode;
  Logo?: ReactNode;
}

export interface LinkItemProps {
  name: string;
  url?: string;
  icon: IconType;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: LinkItemProps[];
  Logo?: ReactNode;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  link: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
  Logo?: ReactNode;
}