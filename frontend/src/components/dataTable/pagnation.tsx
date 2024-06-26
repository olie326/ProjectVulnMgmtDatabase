import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationButton,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/buttonPagination";
import { Table } from "@tanstack/react-table";

export default function TablePagination({ table }: { table: Table<any> }) {
  const pages = [...Array(table.getPageCount()).keys()];
  const currPage = table.getState().pagination.pageIndex;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem key="previous">
          <PaginationPrevious
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {pages.length < 3
          ? pages.map((index) => (
              <PaginationItem key={index}>
                <PaginationButton
                  isActive={index === currPage}
                  onClick={() => table.setPageIndex(index)}
                >
                  {index}{" "}
                </PaginationButton>
              </PaginationItem>
            ))
          : pages.map((index) =>
              index === currPage ||
              index === currPage - 1 ||
              index === currPage + 1 ? (
                <PaginationItem key={index}>
                  <PaginationButton
                    isActive={index === table.getState().pagination.pageIndex}
                    onClick={() => table.setPageIndex(index)}
                  >
                    {index + 1}
                  </PaginationButton>
                </PaginationItem>
              ) : null
            )}

        <PaginationItem key="ellipsis">
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem key="next">
          <PaginationNext
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
