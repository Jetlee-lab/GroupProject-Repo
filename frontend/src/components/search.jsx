import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { LoaderIcon, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { searchIssue } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Command } from "lucide-react";
import { useDebouncedCallback } from "use-debounce"

export function Search() {
  const [q, setQ] = useState("");
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["search", "issues", q],
    queryFn: () => searchIssue({ q }),
    enabled: () => !!q,
  });
  const [open, setOpen] = React.useState(undefined);
  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const debouncedSearch = useDebouncedCallback(value => setQ(value), 500);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(open => !open)}>
      <DialogTrigger asChild className="flex w-full justify-end">
        <div className="ml-8">
          <Button
            variant="outline"
            className="font-normal shadow-none px-4 md:w-[280px] h-10 text-md rounded-lg text-gray-50 border border-blue-300 bg-transparent"
          >
            <span className="flex items-center gap-2">
              <SearchIcon strokeWidth={3} />
              <span className="hidden sm:inline">Search Issues...</span>
            </span>
            <span className="ml-auto hidden sm:flex items-center gap-2">
              <span className="text-xs">
                <Command />
              </span>
              K
            </span>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div>
        <form role="search" className="my-2">
              <Input
                type="search"
                placeholder="Search Issues..."
                name="q"
                onChange={e => debouncedSearch(e.target.value)}
              />
            </form>
        </div>
        <div className="max-h-[290px] overflow-y-scroll transition-[width,height] ease-linear">
          {isError ? (
            <div className="flex justify-center items-center font-bold text-lg">
              Failed to load results {" :("}
            </div>
          ) : (
            (isSuccess && (
              <SearchResults
                q={q}
                result={data.data}
                onResultClick={() => setOpen(false)}
              />
            )) ||
            (isLoading && (
              <div className="flex justify-center items-center">
                <LoaderIcon className="animate-spin" />
              </div>
            )) ||
            null
          )}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

function SearchResults({ q, result, onResultClick = () => void 0 }) {
  return (
    <>
      {result.length ? (
        result.map((issue, i) => (
          <ListItem
            key={i}
            to={`/dashboard/issue/${issue.id}`}
            title={issue.title}
            onClick={() => onResultClick(issue)}
          >
            {issue.description}
          </ListItem>
        ))
      ) : (
        <div className="font-bold text-lg">No Results Found</div>
      )}
    </>
  );
}

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      // <li>
      //   <NavigationMenuLink asChild>
      <Link
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none text-blue-700">
          {title}
        </div>
        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>

      //   </NavigationMenuLink>
      // </li>
    );
  }
);
ListItem.displayName = "ListItem";
