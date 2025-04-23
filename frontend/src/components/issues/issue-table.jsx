"use client"

import * as React from "react"
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
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
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
} from "@tanstack/react-table"
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
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"
import { useQuery, useMutation } from "@tanstack/react-query"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useIssuesMeta } from "@/hooks";
import { queryClient } from "@/lib/client"
import { fetchUsers, paginate, updateIssue, deleteIssue } from "@/lib/api"
import { fromTheme } from "tailwind-merge"
import { MultiSelect } from "@/components/muti-select"

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
  })

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
  )
}

const statusMap = {
  resolved: {
    icon: CheckCircle2Icon,
    color: 'green',
  },
  open: {
    icon: Loader,
  },
  escalated: {
    icon: ArrowUp,
    color: 'orange',
  },
  rejected: {
    icon: CircleX,
    color: 'red',
  },
  in_review: {
    icon: CircleEllipsis,
    color: 'blue',
  },
  closed: {
    icon: Lock,
    color: 'gray',
  },
}

function DraggableRow({ row, ...others }, ...args) {
  // console.log("DragbleRow",{row, others, args})
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

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
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data])
  // const users = queryClient.getQueryData(["users"])
  // const [isEditorOpen, setIsEditorOpen] = React.useState(undefined);
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
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
        return <TableCellViewer item={row.original} />
      },
      enableHiding: false,
    },
    {
      accessorKey: "creator",
      header: "Creator",
      cell: ({ row }) => (
        <div className="">
            {"@"}{row.original.owner.username}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
  
        const status = statusMap[row.original.status]
        
        return <Badge variant="outline" className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
          { status?.icon && <status.icon className={cn(status.color ? `text-${status.color}-500 dark:text-${status.color}-400` : null)} /> || <LoaderIcon />}
          {row.original.status}
        </Badge>
      },
    },
    {
      accessorKey: "priority",
      header: () => <div className="w-full text-right">Priority</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.title}`,
              success: "Done",
              error: "Error",
            })
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
          <Badge variant="outline" className="px-1.5 text-muted-foreground">
            {row.original.priority}
          </Badge>
        </form>
      ),
    },
    {
      accessorKey: "escalation",
      header: () => <div className="w-full text-right">Escalation</div>,
      cell: ({ row }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
              loading: `Saving ${row.original.title}`,
              success: "Done",
              error: "Error",
            })
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
          <Badge variant="outline" className="px-1.5 text-muted-foreground" >
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
        const isAssigned = row.original.assignee !== null
  
        if (isAssigned) {
          return `@${row.original.assignee.username}`
        }

        return <div className="font-display">N/A</div>
  
        return (
          <>
            <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
              Reviewer
            </Label>
            <Select>
              <SelectTrigger className="h-8 w-40" id={`${row.original.id}-reviewer`}>
                <SelectValue placeholder="Assign reviewer" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
              </SelectContent>
            </Select>
          </>
        )
      },
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
              <MoreVerticalIcon />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            {/* <DropdownMenuItem onClick={() => setIsEditorOpen(!isEditorOpen)}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
  
  const table = useReactTable({
    data,
    columns,
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
  })

  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs defaultValue="outline" className="flex w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger className="@4xl/main:hidden flex w-fit" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance" className="gap-1">
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
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
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
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
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
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
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
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
}

function TableCellViewer({ item }) {
  const isMobile = useIsMobile()
  // const [open, setOpen] = React.useState(undefined);
  const issuesMeta = useIssuesMeta()
  const {
    error: studentsError,
    data: studentsRes,
    isFetching: studentsFetching,
  } = useQuery({
    queryKey: ["users", "students"],
    queryFn: () => fetchUsers({endpoint: "students", params: paginate(0, 100)}),
  });
  const {
    error: lecturersError,
    data: lecturersRes,
    isFetching: lecturersFetching,
  } = useQuery({
    queryKey: ["users", "lectures"],
    queryFn: () => fetchUsers({endpoint: 'lecturers', params: paginate(0, 100)}),
  });
  const issueMutation = useMutation({
      mutationFn: updateIssue,
      onSuccess: (data) => {
        // queryClient.invalidateQueries({ queryKey: ['issues'] })
        toast.success("Issue updated successfully")
        // queryClient.invalidateQueries(["issues"])
      },
      onError: (error) => {
        toast.error("Error updating issue")
        console.error("Error updating issue", error)
      },
  });

  // const [cellData, setCellData] = React.useState({
  //   title: item.title,
  //   description: item.description,
  //   owner: item.owner.id,
  //   assignee: item.assignee?.id,
  //   status: item.status,
  //   priority: item.priority,
  //   escalation_level: item.escalation_level,
  //   notes: item.notes
  //   // categories:
  // })

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   console.log({name, value})
  //   setCellData({...cellData, [name]: value})
  //   // cellData[name] = value
  // }

  // const formRef = React.useRef(null)

  const handleSubmit = (formData) => {
    // e.preventDefault()
    // e.stopPropagation()
    // const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.id = item.id
    if (data.assignee === 'null') {
      data.assignee = null
    }
    if (data.owner === 'null') {
      data.owner = null
    }
    // console.log({categories: data.categories})
    data.categories = data.categories.split(',')

    if (data.description === "" && item.description === null) {
      data.description = null
    }
    if (data.notes === "" && item.notes === null) {
      data.notes = null
    }

    issueMutation.mutate(data)
  }
  const [selectedCategotries, setSelectedCategories] = React.useState(item.categories.map((category) => String(category.id)));

  const frameworksList = issuesMeta.categories.map((category) => ({
    value: String(category.id),
    label: category.name,
    icon: LoaderIcon,
  }))
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground whitespace-break-spaces line-clamp-1 h-8">
          {item.title}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader className="gap-1">
          <SheetTitle>{item.header}</SheetTitle>
          <SheetDescription>Issue editor.</SheetDescription>
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
                <div className="flex gap-2 font-medium leading-none justify-center">
                  View / Edit Issue
                </div>
              </div>
              <Separator />
            </>
          )}
          <form id="issue-form" className="flex flex-col gap-4" action={handleSubmit}>
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" defaultValue={item.title} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Input name="description" id="description" type="textarea" defaultValue={String(item.description)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="owner">Creator</Label>
                  <Select name="owner" defaultValue={String(item.owner.id)}>
                    <SelectTrigger id="owner" className="w-full">
                      <SelectValue placeholder="Select a reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      { studentsRes?.data.length > 0
                        && studentsRes.data.map((creator, i) => <SelectItem value={String(creator.id)} key={i}>@{creator.username}</SelectItem>)
                        || <p>No Students</p>
                      }
                    </SelectContent>
                  </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="reviewer">Assignee</Label>
                <Select name="assignee" defaultValue={String(item.assignee ? item.assignee.id  : 'null')}>
                  <SelectTrigger id="assignee" className="w-full">
                    <SelectValue placeholder="Select a assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <SelectItem value="null">{"<"}{ Unassigned }{">"}</SelectItem> */}
                    {item.status === "escalated" ? <SelectItem value={String(item.assignee.id)}>{"<"}Registrar{">"}</SelectItem> : <SelectItem value="null">{"<"}Unassigned{">"}</SelectItem> }
                    { lecturersRes?.data.length > 0
                        && lecturersRes.data.map((assignee, i) => <SelectItem value={String(assignee.id)} key={i}>@{assignee.username}</SelectItem>)
                        || <p>No Lecturers</p>
                    }
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select name="status" defaultValue={String(issuesMeta.statuses.find(s => s.name === item.status)?.id)}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    { issuesMeta.statuses.map((status, i) => <SelectItem value={String(status.id)} key={i}>{status.name}</SelectItem>) }
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="priority">Priority</Label>
                <Select name="priority" defaultValue={String(issuesMeta.priorities.find(p => p.name === item.priority)?.id)} >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    { issuesMeta.priorities.map((priority, i) => <SelectItem value={String(priority.id)} key={i}>{priority.name}</SelectItem>) }
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="escalation">Escalation Level</Label>
                <Select name="escalation_level" defaultValue={String(issuesMeta.escalation_levels.find(l => l.name === item.escalation_level)?.id)} >
                  <SelectTrigger id="escalation" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    { issuesMeta.escalation_levels.map((l, i) => <SelectItem value={String(l.id)} key={i}>{l.name}</SelectItem>) }
                  </SelectContent>
                </Select>
              </div>
              </div>
              {/* <div className="grid grid-cols-2 gap-4"> */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Categories</Label>
                {/* <div className="p-4 max-w-xl"> */}
                  <MultiSelect
                    options={issuesMeta.categories.map((category) => ({
                      value: String(category.id),
                      label: category.name,
                      // icon: LoaderIcon,
                    }))}
                    onValueChange={setSelectedCategories}
                    defaultValue={selectedCategotries}
                    placeholder="Select categories"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                  <input hidden defaultValue={selectedCategotries} name="categories" />
              {/* </div> */}
              </div>
            {/* </div> */}
            
            <div className="flex flex-col gap-3">
              <Label htmlFor="notes">Notes</Label>
              <Input name="notes" id="notes" type="textarea" defaultValue={(item.notes || '') + ''} />
            </div>
            {/* <Button className="w-full" type="submit" form="issue-form">Submit sdhdg</Button> */}
          </form>
        </div>
        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
          <Button className="w-full" type="submit" form="issue-form">Submit</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Done
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default DataTable;