"use client";

import * as React from "react";
import classNames from "classnames";

type ErrorTextProps = React.HTMLAttributes<HTMLParagraphElement>;

const ErrorText = React.forwardRef<HTMLParagraphElement, ErrorTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={classNames("text-sm text-red-500", className)}
        {...props}
      />
    );
  }
);

ErrorText.displayName = "ErrorText";

export { ErrorText }; 