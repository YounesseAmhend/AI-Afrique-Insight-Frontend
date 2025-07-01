import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show pages around current page
            let start = Math.max(0, currentPage - 2);
            let end = Math.min(totalPages - 1, currentPage + 2);
            
            // Adjust if we're near the edges
            if (currentPage < 2) {
                end = Math.min(totalPages - 1, 4);
            } else if (currentPage > totalPages - 3) {
                start = Math.max(0, totalPages - 5);
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        }
        
        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            {/* Go to start button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(0)}
                disabled={currentPage === 0}
                className="h-8 w-8"
                title="Go to first page"
            >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">Go to first page</span>
            </Button>
            
            {/* Previous page button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="h-8 w-8"
                title="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>
            
            {pageNumbers.map((pageNum) => (
                <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum)}
                    className="h-8 w-8"
                >
                    {pageNum + 1}
                </Button>
            ))}
            
            {/* Next page button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="h-8 w-8"
                title="Next page"
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>
            
            {/* Go to end button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(totalPages - 1)}
                disabled={currentPage >= totalPages - 1}
                className="h-8 w-8"
                title="Go to last page"
            >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Go to last page</span>
            </Button>
        </div>
    );
}