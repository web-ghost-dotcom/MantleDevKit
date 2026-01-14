import type { Metadata } from "next";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    title: "Studio - Mantle DevKit",
    description: "Build and deploy smart contracts on Mantle Network",
};

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Providers>{children}</Providers>;
}
