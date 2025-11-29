"use client";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
const CustomSpinner = () => (
  <div className="w-full h-full flex justify-center items-center ">
    <Spinner variant="default" className="text-neutral-500" size={63} />
  </div>
);
export default CustomSpinner;
