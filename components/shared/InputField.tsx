"use client";

import { getMealType } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const InputField = () => {
  return (
    <div className="relative flex w-full">
      <Input
        className="absolute inset-0"
        placeholder={`What did you eat for ${getMealType()}?`}
      />
      <Button
        type="submit"
        className="absolute right-0 top-0 bottom-0 rounded-l-none"
      >
        Add to journal
      </Button>
    </div>
  );
};
export default InputField;
