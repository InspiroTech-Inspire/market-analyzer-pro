import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

const Select = ({ className, value, onValueChange, placeholder, children, ...props }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    setIsOpen(false);
    onValueChange?.(newValue);
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <span className={selectedValue ? "" : "text-muted-foreground"}>{selectedValue || placeholder || "Select an option"}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full p-1 rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === SelectItem) {
              return React.cloneElement(child, {
                onSelect: handleValueChange,
                isSelected: child.props.value === selectedValue,
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-between", className)} {...props}>{children}</div>
);

const SelectValue = ({ className, placeholder, ...props }: { className?: string; placeholder?: string }) => (
  <span className={cn("text-sm", className)} {...props}>{placeholder || "Select an option"}</span>
);

const SelectContent = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("py-1", className)} {...props}>{children}</div>
);

const SelectItem = ({ className, value, onSelect, isSelected, children, ...props }: { className?: string; value: string; onSelect?: (value: string) => void; isSelected?: boolean; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground", className)} onClick={() => onSelect?.(value)} {...props}>
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      {isSelected && <div className="h-2 w-2 rounded-full bg-background" />}
    </span>
    {children}
  </div>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };