import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";
import exp from "constants";

export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    role: UserRole;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    stripeCurrentPeriodEnd: Date;
};

export type SiteConfig = {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    mailSupport: string;
    links: {
        twitter: string;
        github: string;
    };
};

export type NavItem = {
    title: string;
    href: string;
    badge?: number;
    disabled?: boolean;
    external?: boolean;
    authorizeOnly?: UserRole;
    icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
    mainNav: MainNavItem[];
};

export type SidebarNavItem = {
    title: string;
    items: NavItem[];
    authorizeOnly?: UserRole;
    icon?: keyof typeof Icons;
};

export type DocsConfig = {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
    title: string;
    description: string;
    benefits: string[];
    limitations: string[];
    prices: {
        monthly: number;
        yearly: number;
    };
    stripeIds: {
        monthly: string | null;
        yearly: string | null;
    };
};

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
        stripeCurrentPeriodEnd: number | null;
        isPaid: boolean | null;
        interval: "month" | "year" | null;
        isCanceled?: boolean | null;
        stripeSubscriptionId: string | null;
        stripeCustomerId: string | null;
        stripePriceId: string | null;
    };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = {
    feature: string | null;
    tooltip?: string | null;
    starter?: boolean | null;
    pro?: boolean | null;
    business?: boolean | null;
    enterprise?: string | null;
} & {
};

// landing sections
export type InfoList = {
    icon: keyof typeof Icons;
    title: string;
    description: string;
};

export type InfoLdg = {
    title: string;
    image: string;
    description: string;
    list: InfoList[];
};

export type FeatureLdg = {
    title: string;
    description: string;
    link: string;
    icon: keyof typeof Icons;
};

export type TestimonialType = {
    name: string;
    job: string;
    image: string;
    review: string;
};

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
};