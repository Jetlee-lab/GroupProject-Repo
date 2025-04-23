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

export function Search() {
  const [q, setQ] = useState("");
  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["search", "issues", q],
    queryFn: () => searchIssue({ q }),
    enabled: () => !!q,
  });

  const debouncedSearch = (value) => setQ(value);
  return (
    <Dialog open={undefined}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal shadow-none px-4 rounded-lg"><SearchIcon strokeWidth={3}/>Search Issues...</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            <form role="search" className="my-4">
              <Input
                type="search"
                placeholder="Search Issues..."
                name="q"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </form>
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[290px] overflow-y-scroll transition-[width,height] ease-linear">
        {isError ? (
          <div className="flex justify-center items-center font-bold text-lg">Failed to load results {" :("}</div>
        ) : (
          (isSuccess && <SearchResults q={q} result={data.data} onResultClick={() => setOpen(false)}/>) ||
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

function SearchResults({ q, result, onResultClick = () => void(0) }) {
  return (
    <>
      {result.length ? (
        result.map((issue, i) => (
          <ListItem key={i} to={`issues?id=${issue.id}`} title={issue.title} onClick={() => onResultClick(issue)}>
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
          <div className="text-sm font-medium leading-none text-blue-700">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>

      //   </NavigationMenuLink>
      // </li>
    );
  }
);
ListItem.displayName = "ListItem";
