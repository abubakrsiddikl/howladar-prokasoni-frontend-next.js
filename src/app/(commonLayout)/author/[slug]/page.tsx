import AuthorDetailsCard from "@/components/module/Author/AuthorDetailsCard";
import { getSingleAuthorsWithBooks } from "@/services/Author/author.api";

export default async function AuthorDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const author = await getSingleAuthorsWithBooks(slug);

  return (
    <div>
      <AuthorDetailsCard author={author?.data}></AuthorDetailsCard>
    </div>
  );
}
