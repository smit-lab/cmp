import { LoaderCircle } from "lucide-react";
const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoaderCircle className="animate-spin w-8 h-8" />
    </div>
  );
};

export default Loading;
