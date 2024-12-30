"use client";

import * as React from "react";
import classNames from "classnames";

interface ErrorTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

function ErrorText({ className, ...props }: ErrorTextProps) {
  const styles = "text-sm font-medium text-red-500";

  return (
    <p 
      className={classNames(
        styles,
        className
      )} 
      {...props} 
    />
  );
}

export { ErrorText }; 