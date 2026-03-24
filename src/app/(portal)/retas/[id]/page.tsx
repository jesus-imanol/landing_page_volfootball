"use client";
import { useParams } from "next/navigation";
import RetaDetailView from "@/features/retas/views/RetaDetailView";
export default function RetaDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  return <RetaDetailView id={id} />;
}
