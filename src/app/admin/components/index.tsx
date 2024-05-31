import AdminLayout from "@/components/layout/layoutAdmin";
import CardAnalytics1 from "./analytics1";

export const Dashboard = () => {
  return (
    <div>
      <AdminLayout>
        <div className="h-auto flex">
          <CardAnalytics1 />
        </div>
      </AdminLayout>
    </div>
  );
};