"use client";

import * as React from "react";
import classNames from "classnames";

type BadgeProps = React.HTMLAttributes<HTMLDivElement>;

function Badge({ 
  className, 
  ...props 
}: BadgeProps) {
  const styles = "inline-flex items-center rounded-md border border-transparent bg-black text-white px-2 py-0.5 text-xs font-semibold transition-colors hover:bg-black/80";

  return (
    <div 
      className={classNames(
        styles,
        className
      )} 
      {...props} 
    />
  );
}

export { Badge };