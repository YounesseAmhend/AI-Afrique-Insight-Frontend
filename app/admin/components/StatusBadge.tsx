interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const dotColors = {
        AVAILABLE: "#22c55e",
        UNAVAILABLE: "#ef4444",
        FETCHING: "#eab308",
    };

    const bgColor = dotColors[status as keyof typeof dotColors];

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#000",
                fontSize: "0.95rem",
                fontWeight: "500",
            }}
        >
            <span
                style={{
                    display: "inline-block",
                    width: "0.7rem",
                    height: "0.7rem",
                    borderRadius: "9999px",
                    backgroundColor: bgColor,
                }}
            ></span>
            <span className='capitalize'>{status.toLowerCase()}</span>
        </span>
    );
}
