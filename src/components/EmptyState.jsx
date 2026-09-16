export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-surface/60 p-10 text-center">
      <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-surface2 font-quote text-3xl text-accent">”</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{description}</p>
      {actionLabel && (
        <button onClick={onAction} className="mt-5 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink">
          {actionLabel}
        </button>
      )}
    </div>
  )
}