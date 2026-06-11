import {useMemo} from "react";

type DatePart = "year" | "month" | "day";

type StatementHeaderProps = {
    statementNumber: string;
    issuedAt: string;
    onStatementNumberChange: (statementNumber: string) => void;
    onIssuedAtChange: (issuedAt: string) => void;
};

const dateInputConfig: Record<DatePart, { maxLength: number; max?: number }> = {
    year: {maxLength: 4},
    month: {maxLength: 2, max: 12},
    day: {maxLength: 2, max: 31},
} satisfies Record<DatePart, { maxLength: number; max?: number }>;

const normalizeDatePart = (part: DatePart, value: string) => {
    const config = dateInputConfig[part];
    const digits = value.replace(/\D/g, "").slice(0, config.maxLength);

    if (!digits || config.max === undefined) {
        return digits;
    }

    return String(Math.min(Number(digits), config.max));
};

export function StatementHeader({
                                    statementNumber,
                                    issuedAt,
                                    onStatementNumberChange,
                                    onIssuedAtChange,
                                }: StatementHeaderProps) {
    const dateParts = useMemo(() => {
        const [year = "", month = "", day = ""] = issuedAt.match(/\d+/g) ?? [];

        return {year, month, day};
    }, [issuedAt]);

    const setIssuedAtPart = (part: DatePart, value: string) => {
        const nextDate = {
            ...dateParts,
            [part]: normalizeDatePart(part, value),
        };

        onIssuedAtChange(`${nextDate.year}년 ${nextDate.month}월 ${nextDate.day}일`);
    };

    return (
        <div className={"p-1"}>
            <div className={"flex items-center justify-between"}>
                <div className="flex items-center gap-2 w-40">
                    <label className="text-sm">
                        No.
                    </label>

                    <input
                        className="sheet-input underline-input w-full"
                        value={statementNumber}
                        onChange={(event) => onStatementNumberChange(event.currentTarget.value)}
                    />
                </div>

                <div className="flex items-center gap-2 text-sm">
                    <div className={"flex items-center gap-1 w-15"}>
                        <input
                            className="sheet-input underline-input text-right"
                            inputMode="numeric"
                            maxLength={4}
                            pattern="[0-9]*"
                            value={dateParts.year}
                            onChange={(event) => setIssuedAtPart("year", event.currentTarget.value)}
                        />
                        <span>년</span>
                    </div>

                    <div className={"flex items-center gap-1 w-10"}>
                        <input
                            className="sheet-input underline-input text-right"
                            inputMode="numeric"
                            maxLength={2}
                            pattern="[0-9]*"
                            value={dateParts.month}
                            onChange={(event) => setIssuedAtPart("month", event.currentTarget.value)}
                        />
                        <span>월</span>
                    </div>

                    <div className={"flex items-center gap-1 w-10"}>
                        <input
                            className="sheet-input underline-input text-right"
                            inputMode="numeric"
                            maxLength={2}
                            pattern="[0-9]*"
                            value={dateParts.day}
                            onChange={(event) => setIssuedAtPart("day", event.currentTarget.value)}
                        />
                        <span>일</span>
                    </div>
                </div>
            </div>

            <h1 className="text-center text-4xl font-semibold tracking-[0.3em]">거래명세서</h1>
        </div>
    );
}
