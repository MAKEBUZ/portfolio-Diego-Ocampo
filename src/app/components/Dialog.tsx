'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
export default function Dialog({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const dialog = ref.current!;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`cinema-dialog ${wide ? 'dialog-wide' : ''}`}
      aria-labelledby={titleId}
      onCancel={() => close.current()}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            close.current();
        }
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">DIEGO OCAMPO · PORTFOLIO</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar ventana">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
