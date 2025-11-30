import { use } from "react";
import data2 from "@/data/data2.json";
import { notFound } from "next/navigation";
import { CategoryClient } from "@/lib/category-client";

interface CategoryPageProps {
  params: Promise<{ type: string }>;
}

const categoryMap: { [key: string]: string } = {
  "generate-image": "Generate Image",
  "generate-video": "Generate Video",
  "for-music": "For Music",
  "for-writing": "For Writing",
  "for-text": "For Text",
  "for-editing": "For Editing",
  "for-code": "For Code",
  "for-design": "For Design",
};

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const categoryName = categoryMap[type];

  return {
    title: categoryName
      ? `${categoryName} AI Tools - ToolFinder`
      : "Category Not Found",
    description: categoryName
      ? `Discover the best ${categoryName.toLowerCase()} AI tools. Browse and compare ${categoryName.toLowerCase()} solutions.`
      : "No description available.",
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { type } = use(params);

  const categoryName = categoryMap[type];
  if (!categoryName) notFound();

  const filteredTools = data2.data.posts.edges.filter((edge) =>
    edge.node.type && edge.node.type.includes(categoryName)
  );

  return (
    <CategoryClient
      type={type}
      categoryName={categoryName}
      filteredTools={filteredTools}
    />
  );
}
