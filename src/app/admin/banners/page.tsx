export const dynamic = "force-dynamic";

import { adminGetBanners } from "@/actions/admin";
import { AdminBannerActions } from "./actions";

export default async function AdminBannersPage() {
  const banners = await adminGetBanners();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Banners</h1>
      </div>

      <div className="grid gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: banner.bgColor }}
                />
                <h3 className="text-sm font-semibold text-gray-900">
                  {banner.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500">{banner.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">
                CTA: {banner.cta} → {banner.link}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  banner.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {banner.active ? "Active" : "Inactive"}
              </span>
              <AdminBannerActions bannerId={banner.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
