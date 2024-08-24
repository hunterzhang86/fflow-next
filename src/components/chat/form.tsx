import { ComponentProps, forwardRef } from "react";
import { IconArrowBack } from "@tabler/icons-react";

import cx from "@/lib/cx";

export interface Props extends ComponentProps<"form"> {
  inputProps: ComponentProps<"input">;
  buttonProps: ComponentProps<"button">;
}

const Form = ({ inputProps, buttonProps, onSubmit }: Props, ref: any) => {
  return (
    <form onSubmit={onSubmit} className="flex w-full items-center" ref={ref}>
      <input
        placeholder="Your question..."
        required
        {...inputProps}
        className={cx(
          "h-10 flex-1 rounded-xl pl-4 pr-12 transition md:h-12",
          "border border-gray-400 text-base",
          "disabled:bg-gray-100",
          inputProps.className,
        )}
        type="text"
      />

      <button {...buttonProps} type="submit" tabIndex={-1}>
        <IconArrowBack stroke={1.5} />
      </button>
    </form>
  );
};

export default forwardRef(Form);
