type StatementFooterProps = {
  note: string;
  onNoteChange: (note: string) => void;
};

export function StatementFooter({ note, onNoteChange }: StatementFooterProps) {
  return (
    <footer className="border-t border-neutral-900 px-3 py-0.5">
      <textarea
        className="sheet-input block resize-none overflow-hidden text-xs leading-4"
        rows={5}
        value={note}
        onChange={(event) => onNoteChange(event.currentTarget.value)}
      />
    </footer>
  );
}
