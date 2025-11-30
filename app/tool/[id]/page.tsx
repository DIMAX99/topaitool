import { use } from "react";
import data2 from "@/data/data2.json";
import { notFound } from "next/navigation";
import { ToolClient } from "@/lib/tool-client";


interface ToolPageProps {
  params: Promise<{ id: string }>;
}
export const metadata = {
  title:"Tool Detail"
}
export default function ToolPage({ params }: ToolPageProps) {
  const { id } = use(params);
  
  // Find the tool by ID
  const tool = data2.data.posts.edges.find((edge) => edge.node.id === id);

  if (!tool) {
    notFound();
  }

  return <ToolClient tool={tool} />;
}
