import LoaderSpinner from "../Loaders/LoaderSpinner";

interface Props {
  loading: boolean;
}

export const EmptyTableCard = ({ loading }: Props) => {
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl">
          <LoaderSpinner />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-zinc-400 text-lg">
            The Trip you’re looking for can’t be found.
          </p>
        </div>
      )}
    </>
  );
};
