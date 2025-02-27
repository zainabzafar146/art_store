import PageHeading from "@/components/common/PageHeading";
import ProductUploadForm from "@/components/artist/ProductUploadForm";
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();

  return (
    <section className="flex flex-col gap-y-10 py-10">
      <PageHeading text="Upload Art" />
      <ProductUploadForm session={session ?? null}   />
    </section>
  );
};

export default page;
