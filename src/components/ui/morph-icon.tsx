"use client";

import React, { useState } from "react";
import { MorphIcon } from "morphicons/react";
import type { IconNode } from "lucide";

export interface MorphIconProps extends Omit<
    React.SVGProps<SVGSVGElement>,
    "ref" | "color" | "size" | "from" | "to"
> {
    from: IconNode;
    to?: IconNode;
    trigger?: "hover" | "click" | "controlled";
    active?: boolean;
    spring?: "snappy" | "bouncy" | "smooth";
    size?: number | string;
    strokeWidth?: number;
    color?: string;
    className?: string;
    wrapperClassName?: string;
}

export function MorphIconWrapper({
    from,
    to,
    trigger = "hover",
    active,
    spring = "snappy",
    size = 20,
    strokeWidth = 2,
    color,
    className = "",
    wrapperClassName = "inline-flex items-center justify-center shrink-0",
    onClick,
    ...rest
}: MorphIconProps) {
    const [internalActive, setInternalActive] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isCurrentActive =
        trigger === "controlled"
            ? Boolean(active)
            : active !== undefined
              ? active
              : trigger === "click"
                ? internalActive
                : isHovered;

    const currentIcon = isCurrentActive && to ? to : from;

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        if (trigger === "click") {
            setInternalActive((prev) => !prev);
        }
        onClick?.(e as unknown as React.MouseEvent<SVGSVGElement>);
    };

    return (
        <span
            className={wrapperClassName}
            onMouseEnter={() => {
                if (trigger === "hover") setIsHovered(true);
            }}
            onMouseLeave={() => {
                if (trigger === "hover") setIsHovered(false);
            }}
            onClick={handleClick}
        >
            <MorphIcon
                icon={currentIcon}
                spring={spring}
                size={size}
                strokeWidth={strokeWidth}
                color={color}
                className={className}
                {...rest}
            />
        </span>
    );
}

// Named export as both MorphIconWrapper and MorphIcon
export { MorphIconWrapper as AppMorphIcon };
