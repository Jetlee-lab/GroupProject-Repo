import { DashboardLayout } from "../components/dashboard-layout";

// import DefaultLayout from "../../../layouts/default";

export default function Home() {
  return (
    // <DefaultLayout>
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <h2 className="text-xl font-semibold">Overview</h2>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 flex-1 min-h-[500px]">
          {/* Main content goes here */}
          <div className="flex items-center justify-center h-full">
            <div className="w-1 h-1 bg-red-500 rounded-full" />
          </div>
        </div>
      </div>
    </DashboardLayout>
    // </DefaultLayout>
  )
}

