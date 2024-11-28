import AuctionProductTable from "@/components/admin/AuctionProductTable";
import PageHeading from "@/components/common/PageHeading";

const page = () => {
  return (
    <main className="flex flex-col gap-y-10 py-10 justify-center items-center">
      <PageHeading text="Auction Products" />
      <div className="w-full px-10 min-h-screen">
        <AuctionProductTable />
      </div>
    </main>
  );
};

export default page;
