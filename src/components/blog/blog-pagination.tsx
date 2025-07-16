"use client";

import { Button } from "@/components/ui/button";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;

    // Previous button
    buttons.push(
      <Button
        key="prev"
        variant="outline"
        className="border-[#004B4B] text-[#004B4B]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>,
    );

    // Calculate visible range
    let startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2),
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // First page and ellipsis
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant={1 === currentPage ? "default" : "outline"}
          className={
            1 === currentPage
              ? "bg-[#004B4B]"
              : "border-[#004B4B] text-[#004B4B]"
          }
          onClick={() => onPageChange(1)}
        >
          1
        </Button>,
      );
      if (startPage > 2) {
        buttons.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>,
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          className={
            i === currentPage
              ? "bg-[#004B4B]"
              : "border-[#004B4B] text-[#004B4B]"
          }
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>,
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant={totalPages === currentPage ? "default" : "outline"}
          className={
            totalPages === currentPage
              ? "bg-[#004B4B]"
              : "border-[#004B4B] text-[#004B4B]"
          }
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }

    // Next button
    buttons.push(
      <Button
        key="next"
        variant="outline"
        className="border-[#004B4B] text-[#004B4B]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>,
    );

    return buttons;
  };

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center gap-2">{renderPaginationButtons()}</div>
    </div>
  );
}
