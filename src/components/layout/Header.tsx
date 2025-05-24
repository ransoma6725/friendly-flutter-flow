
import { ReactNode } from "react";
import { BusIcon } from "lucide-react";

interface HeaderProps {
  children?: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 md:mb-6">
      <div className="flex items-center gap-2">
        <BusIcon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          CamBus <span className="text-primary">Ticketing</span>
        </h1>
      </div>
      
      {children && (
        <div className="flex items-center gap-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default Header;
