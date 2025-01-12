import { ErrorMessage } from "formik";

interface FErrorMessageProps {
  name: string;
}
export function FErrorMessage({ name }: FErrorMessageProps) {
  return <ErrorMessage className="bg-white text-xs" name={name} />;
}
