import PostScanActions from "@/components/actions/PostScanActions";

export default function ActionSection({ scan }) {
  if (!scan || scan.analysisStatus !== "DONE") return null;

  return (
    <section className="mt-8">
      <PostScanActions />
    </section>
  );
}
