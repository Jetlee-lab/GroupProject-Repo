"use client";

import * as React from "react";
import { format } from "date-fns";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  // type DragEndEvent,
  // type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  // type ColumnDef,
  // type ColumnFiltersState,
  // type Row,
  // type SortingState,
  // type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2Icon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  GripVerticalIcon,
  LoaderIcon,
  MoreVerticalIcon,
  PlusIcon,
  TrendingUpIcon,
  ArrowUp,
  CircleX,
  DotSquare,
  Loader,
  CircleEllipsis,
  Lock,
  Trash2,
  Ellipsis,
  ListCheck,
  EditIcon,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { z } from "zod";
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useIssuesMeta } from "@/hooks";
import { queryClient } from "@/lib/client";
import {
  fetchUsers,
  fetchIssues,
  paginate,
  updateIssue,
  deleteIssue,
} from "@/lib/api";
import { fromTheme, twMerge } from "tailwind-merge";
import { MultiSelect } from "@/components/muti-select";
import { Description } from "@radix-ui/react-dialog";
import {
  TitleInput,
  DescriptionInput,
  CreatorInput,
  AssigneeInput,
  StatusInput,
  PriorityInput,
  EscalationInput,
  CategoriesInput,
  NotesInput,
} from "./issue-fields";
import { useActiveRole } from "@/hooks";
import { statusMap, priorityMap, ROLE_REGISTRAR } from "@/lib/constants";
import { ROLE_STUDENT, ROLE_LECTURER } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

const CreateIssueForm = React.lazy(() =>
  import("@/components/issues/create-issue")
);

export function DialogDemo() {
  return <></>;
}

// export const schema = z.object({
//   id: z.number(),
//   header: z.string(),
//   type: z.string(),
//   status: z.string(),
//   target: z.string(),
//   limit: z.string(),
//   reviewer: z.string(),
// })

// Create a separate component for the drag handle
function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

function DraggableRow({ row, ...others }, ...args) {
  // console.log("DragbleRow",{row, others, args})
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({ data: initialData, onLoadMore, count }) {
  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState(() => ({
    pageIndex: 0,
    pageSize: 10,
  }));
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );
  const issueDeleteMutation = useMutation({
    mutationFn: deleteIssue,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ['issues'] })
      toast.success("Issue Deleted successfully");
      queryClient.invalidateQueries(["issues"])
    },
    onError: (error) => {
      toast.error("Error deleting issue");
      console.error("Error deleting issue", error);
    },
  });
  const [edittedRow, setEdittedRow] = React.useState(null)

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data]);
  // const users = queryClient.getQueryData(["users"])
  // const [isEditorOpen, setIsEditorOpen] = React.useState(undefined);
  const [{ name: activeRole }] = useActiveRole();
  const navigate = useNavigate();
  let toSplice = [];

  switch (activeRole) {
    case ROLE_STUDENT:
      toSplice = ["creator"];
      break;
    case ROLE_LECTURER:
      toSplice = ["assignee"];
      break;
    default:
      break;
  }

  const columns = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => {
        // console.log("---->",row.id, edittedRow ? edittedRow.id == row.id : false)
        return <TableCellViewer item={row.original} isEditMenuOpen={edittedRow ? (edittedRow.id == row.id) || undefined : undefined} onOpenChange={(state) => {setEdittedRow(state)}} />;
      },
      enableHiding: false,
    },
    {
      accessorKey: "creator",
      header: "Student",
      cell: ({ row }) => (
        <div className="">
          {"@"}
          {row.original.owner.username}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = statusMap[row.original.status];

        return <StatusBadge status={row.original.status} className="text-xs" />;
      },
    },
    {
      accessorKey: "priority",
      header: () => <div className="w-full text-right">Priority</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.title}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label htmlFor={`${row.original.id}-target`} className="sr-only">
            Priority
          </Label>
          {/* <Input
            className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
            defaultValue={row.original.target}
            id={`${row.original.id}-target`}
          /> */}
          <PriorityBadge priority={row.original.priority} className="text-xs" />
        </form>
      ),
    },
    {
      accessorKey: "escalation",
      header: () => <div className="w-full text-right">Escalation</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.title}`,
              success: "Done",
              error: "Error",
            });
          }}
        >
          <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
            Escalation
          </Label>
          {/* <Input
            className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
            defaultValue={row.original.priority}
            id={`${row.original.id}-limit`}
          /> */}
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {row.original.escalation_level}
          </Badge>
        </form>
      ),
    },
    {
      accessorKey: "assignee",
      header: "Assigned to",
      cell: ({ row, ...others }, ...args) => {
        // console.log("Assignee",{row, others, args})
        const isAssigned = row.original.assignee !== null;

        if (isAssigned) {
          return `@${row.original.assignee.username}`;
        }

        return (
          <div className="font-display text-xs">
            {"<"}Unassigned{">"}
          </div>
        );

        // return (
        //   <>
        //     <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
        //       Reviewer
        //     </Label>
        //     <Select>
        //       <SelectTrigger
        //         className="h-8 w-40"
        //         id={`${row.original.id}-reviewer`}
        //       >
        //         <SelectValue placeholder="Assign reviewer" />
        //       </SelectTrigger>
        //       <SelectContent align="end">
        //         <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
        //         <SelectItem value="Jamik Tashpulatov">
        //           Jamik Tashpulatov
        //         </SelectItem>
        //       </SelectContent>
        //     </Select>
        //   </>
        // );
      },
    },
    {
      id: "actions",
      cell: ({ row, ...others }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {/* <DropdownMenuItem onClick={() => setIsEditorOpen(!isEditorOpen)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className="text-blue-500"
              onClick={() => setEdittedRow(row.original)}
            >
              <EditIcon className="text-blue-500" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={() => handleDelete(row.original)}
            >
              <Trash2 className="text-red-500" /> Delete
            </DropdownMenuItem>
            {[ROLE_LECTURER, ROLE_REGISTRAR].includes(activeRole) && (
              <DropdownMenuItem
                className="text-blue-500"
                onClick={() => navigate(`/dashboard/issue/${row.original.id}`)}
              >
                <ListCheck className="text-blue-500" /> Review
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  // console.log({
  //   toSplice,
  //   activeRole,
  //   ...columns.map((c) => ({
  //     [c.accessorKey]: !toSplice.includes(c.accessorKey),
  //   })),
  // });
  const table = useReactTable({
    data,
    columns: columns.filter((c) => !toSplice.includes(c.accessorKey)),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
  });

  // console.log({ data, initialData, ...pagination });
  React.useEffect(() => {
    if (data === initialData) return;
    setData([...data, ...initialData]);
  }, [initialData]);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }

  const handleDelete = (issue) => {
    issueDeleteMutation.mutate(issue.id);
  };

  return (
    <Tabs
      defaultValue="outline"
      className="bg-white rounded-lg flex w-full flex-col justify-start gap-6 p-2"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        {/* <Select defaultValue="outline">
          <SelectTrigger className="@4xl/main:hidden flex w-fit" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select> */}
        <TabsList className="@4xl/main:flex">
          <TabsTrigger value="outline">Overview</TabsTrigger>
          {/* <TabsTrigger value="past-performance" className="gap-1">
            Past Performance{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel" className="gap-1">
            Key Personnel{" "}
            <Badge
              variant="secondary"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
            >
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger> */}
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {(activeRole === ROLE_STUDENT && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"default"} size="sm">
                  <PlusIcon />
                  <span className="hidden lg:inline">Create New Issue</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="md:min-w-[756px] md:max-h-[552px] m-4 overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-bold">Create Issue</DialogTitle>
                  <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4">
                  <CreateIssueForm />
                </div>
                <DialogFooter>
                  {/* <Button type="submit">Save changes</Button> */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )) ||
            null}
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-semibold"
                    >
                      No Issues Found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <div className="flex w-fit items-center justify-center text-sm font-medium"> */}
            {/* </div> */}
            {data.length > 0 && (
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            )}
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="size-8"
                    onClick={() => {
                      const hasMore = onLoadMore();
                      if (!hasMore) {
                        toast.info("No more data to load!");
                      }
                    }}
                  >
                    <span className="sr-only">
                      Load more {`${data.length} of ${count}`} results
                    </span>
                    <Ellipsis />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-blue-500 p-1 text-white text-xs rounded-md">
                  Load More {`${data.length} of ${count}`} results
                </TooltipContent>
              </Tooltip>

              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
};

function TableCellViewer({ item, isEditMenuOpen, onOpenChange }) {
  const isMobile = useIsMobile();
  // const [open, setOpen] = React.useState(undefined);
  const studentsRes = queryClient.getQueryData(["users", "students"]);
  const lecturersRes = queryClient.getQueryData(["users", "lecturers"]);
  const issuesMeta = useIssuesMeta();
  const issueMutation = useMutation({
    mutationFn: updateIssue,
    onSuccess: (data) => {
      toast.success("Issue updated successfully");
      queryClient.invalidateQueries({ queryKey: ["issues"] });
      // console.log({item,data: data.data})
    },
    onError: (error) => {
      toast.error("Error updating issue");
      console.error("Error updating issue", error);
    },
  });
  const [isOpen, setIsOpen] = React.useState(isEditMenuOpen)

  React.useEffect(() => {
    // console.log({isEditMenuOpen})
    setIsOpen(isEditMenuOpen)
  }, [isEditMenuOpen])

  const [{ name: activeRole }] = useActiveRole();

  const dataRef = React.useRef({
    title: item.title,
    description: item.description,
    owner: item.owner.id,
    assignee: item.assignee?.id || null,
    status: issuesMeta.statuses.find((s) => s.name === item.status).id,
    priority: issuesMeta.priorities.find((p) => p.name === item.priority).id,
    escalation_level: issuesMeta.escalation_levels.find(
      (l) => l.name === item.escalation_level
    ).id,
    course_unit: item.course_unit,
    categories: item.categories.map((c) => String(c.id)),
    notes: item.notes,
  });

  const handleSubmit = (formData) => {
    // e.preventDefault()
    // e.stopPropagation()
    // const formData = new FormData(e.target)
    const data = dataRef.current;
    issueMutation.mutate({ issue: data, id: item.id });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(state) => {
      // console.log({state})
      isOpen ? onOpenChange(state) : void(0)
      }}>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="px-0 text-left text-foreground whitespace-break-spaces line-clamp-1 h-8 w-full"
        >
          {item.title}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col md:min-w-[512px] md:px-4"
      >
        <SheetHeader className="gap-1">
          <SheetTitle>Issue Details</SheetTitle>
          <SheetDescription>You can edit this issue here.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-2 px-4 text-sm">
          {!isMobile && (
            <>
              {/* <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator /> */}
              <div className="grid gap-2">
                <div className="flex flex-col gap-2 font-medium leading-none justify-center">
                  <div className="flex gap-4">
                    <span>Created on:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="font-normal text-xs">
                      {format(
                        new Date(item.created_at),
                        "MMM, do yyyy - H:m:s aa"
                      )}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span>Last Updated:</span>
                    <span className="font-normal text-xs">
                      {item.updated_at
                        ? format(
                            new Date(item.created_at),
                            "MMM, do yyyy - H:m:s aa"
                          )
                        : "Never"}
                    </span>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}
          <form
            id="issue-update-form"
            className="flex flex-col gap-6"
            action={handleSubmit}
          >
            <div className="flex flex-col gap-3">
              <TitleInput dataRef={dataRef} />
            </div>
            <div className="flex flex-col gap-3">
              <DescriptionInput dataRef={dataRef} />
            </div>
            {(activeRole !== ROLE_STUDENT && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <CreatorInput
                    creators={studentsRes?.data}
                    dataRef={dataRef}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <AssigneeInput
                    assignees={lecturersRes?.data}
                    item={item}
                    dataRef={dataRef}
                  />
                </div>
              </div>
            )) ||
              null}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                {(activeRole === ROLE_STUDENT && (
                  <>
                    <Label htmlFor="status" className="font-semibold">
                      Status
                    </Label>
                    <StatusBadge status={item.status} className="p-2" />
                  </>
                )) || (
                  <StatusInput
                    statuses={issuesMeta.statuses}
                    dataRef={dataRef}
                  />
                )}
              </div>
              <div className="flex flex-col gap-3">
                {(activeRole === ROLE_STUDENT && (
                  <>
                    <Label htmlFor="status" className="font-semibold">
                      Priority
                    </Label>
                    <PriorityBadge priority={item.priority} className="p-2" />
                  </>
                )) || (
                  <PriorityInput
                    priorities={issuesMeta.priorities}
                    dataRef={dataRef}
                  />
                )}
              </div>
            </div>
            {(activeRole !== ROLE_STUDENT && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <EscalationInput
                    escalationLevels={issuesMeta.escalation_levels}
                    dataRef={dataRef}
                  />
                </div>
              </div>
            )) ||
              null}
            {/* <div className="grid grid-cols-2 gap-4"> */}
            <div className="flex flex-col gap-3">
              {/* <div className="p-4 max-w-xl"> */}
              <CategoriesInput
                categories={issuesMeta.categories}
                dataRef={dataRef}
              />
              {/* </div> */}
            </div>
            {/* </div> */}

            <div className="flex flex-col gap-3">
              <NotesInput notes={item.notes} dataRef={dataRef} />
            </div>
          </form>
        </div>
        <SheetFooter className="mt-auto flex gap-4 md:flex-row sm:space-x-0">
          <Button
            className="w-full md:w-1/2"
            type="submit"
            form="issue-update-form"
          >
            Submit
          </Button>
          <SheetClose asChild className="">
            <Button variant="outline" className="w-full md:w-1/2">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function StatusBadge({
  status,
  className,
  variant = "outline",
  ...props
}) {
  const statusObj = statusMap[status];

  return (
    <Badge
      variant="outline"
      className={twMerge(
        "flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 font-semibold text-sm",
        `bg-${statusObj.color}-100 text-${statusObj.color}-600`,
        className
      )}
      {...props}
    >
      {(statusObj?.icon && (
        <statusObj.icon
          className={cn(
            statusObj.color
              ? `text-${statusObj.color}-500 dark:text-${statusObj.color}-400`
              : null
          )}
        />
      )) || <LoaderIcon />}
      {status}
    </Badge>
  );
}

export function PriorityBadge({
  priority,
  className,
  variant = "outline",
  ...props
}) {
  const priorityObj = priorityMap[priority];

  return (
    <Badge
      variant={variant}
      className={twMerge(
        "flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3 font-semibold text-sm",
        className
      )}
    >
      {(priorityObj?.icon && (
        <priorityObj.icon
          className={cn(
            priorityObj.color
              ? `text-${priorityObj.color}-500 dark:text-${priorityObj.color}-400`
              : null
          )}
        />
      )) || <LoaderIcon />}
      {priority}
    </Badge>
  );
}

export default function IssuesTable() {
  const [page, setPage] = React.useState(0);
  const [size] = React.useState(100);
  const { status, data, error, isFetching, isPlaceholderData, isSuccess } =
    useQuery({
      queryKey: ["issues", page],
      queryFn: () => fetchIssues({ params: paginate(page, size) }),
      placeholderData: keepPreviousData,
      keepPreviousData: true,
      // staleTime: 5000,
    });
  queryClient.prefetchQuery({
    queryKey: ["users", "students"],
    queryFn: () =>
      fetchUsers({ endpoint: "students", params: paginate(0, 100) }),
  });
  queryClient.prefetchQuery({
    queryKey: ["users", "lecturers"],
    queryFn: () =>
      fetchUsers({ endpoint: "lecturers", params: paginate(0, 100) }),
  });
  const deferredData = React.useDeferredValue(data, data);

  // console.log({ status, data, error });
  const hasMore = !!deferredData?.meta.pagination.next;
  // console.log({ page, ...paginate(page, 1), hasMore, data: data?.data });

  // Prefetch the next page!
  React.useEffect(() => {
    // console.log({ isPlaceholderData, hasMore, meta: data?.meta.pagination });
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["issues", page + 1],
        queryFn: () => fetchIssues({ params: paginate(page + 1, size) }),
      });
    }
  }, [deferredData, isPlaceholderData, page]);

  const handleLoadMore = () => {
    setPage((old) => (hasMore ? old + 1 : old));

    return hasMore;
  };

  if (!deferredData) return null;

  return (
    <>
      {/* <div>Current Page: {page + 1}</div>
      <Button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </Button>{" "}
      <Button
        onClick={() => {
          setPage((old) => (hasMore ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !hasMore}
      >
        Next Page
      </Button> */}
      {isSuccess && (
        <DataTable
          data={deferredData.data}
          onLoadMore={handleLoadMore}
          count={deferredData.meta.pagination.count}
        />
      )}
    </>
  );
}
