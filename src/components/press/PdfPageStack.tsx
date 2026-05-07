"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";

type PdfPageStackProps = {
  url: string;
  title: string;
};

type PdfPageProps = {
  document: PDFDocumentProxy;
  pageNumber: number;
  title: string;
};

function PdfPageCanvas({ document, pageNumber, title }: PdfPageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    let cancelled = false;
    let renderTask: ReturnType<Awaited<ReturnType<typeof document.getPage>>["render"]> | undefined;

    const renderPage = async () => {
      const canvas = canvasRef.current;
      const containerWidth = frame.clientWidth;
      if (!canvas || containerWidth <= 0) return;

      const page = await document.getPage(pageNumber);
      if (cancelled) return;

      const baseViewport = page.getViewport({ scale: 1 });
      const ratio = baseViewport.width / baseViewport.height;
      setAspectRatio(ratio);

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({
        scale: (containerWidth * pixelRatio) / baseViewport.width,
      });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerWidth / ratio}px`;

      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);

      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
      });

      await renderTask.promise.catch((error: unknown) => {
        if (!cancelled) throw error;
      });
    };

    renderPage();

    const resizeObserver = new ResizeObserver(() => {
      renderTask?.cancel();
      renderPage();
    });
    resizeObserver.observe(frame);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      renderTask?.cancel();
    };
  }, [document, pageNumber]);

  return (
    <div
      ref={frameRef}
      className="mx-auto w-full max-w-4xl overflow-hidden bg-white shadow-[0_22px_80px_rgba(0,0,0,0.58)]"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <canvas
        ref={canvasRef}
        aria-label={`${title} page ${pageNumber}`}
        className="block w-full bg-white"
      />
    </div>
  );
}

export function PdfPageStack({ url, title }: PdfPageStackProps) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadingTask: ReturnType<typeof import("pdfjs-dist")["getDocument"]> | undefined;

    const loadDocument = async () => {
      const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
      if (cancelled) return;

      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      loadingTask = pdfjs.getDocument(url);
      loadingTask.promise.then((loadedDocument) => {
        if (cancelled) {
          loadedDocument.destroy();
          return;
        }

        setDocument(loadedDocument);
        setPageCount(loadedDocument.numPages);
      }).catch(() => {
        if (!cancelled) setError(true);
      });
    };

    loadDocument().catch(() => {
      if (!cancelled) setError(true);
    });

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [url]);

  if (error) {
    return (
      <p className="mx-auto max-w-4xl text-sm leading-6 text-neutral-500">
        The saved article could not be rendered.
      </p>
    );
  }

  if (!document || pageCount === 0) {
    return (
      <p className="mx-auto max-w-4xl text-sm uppercase tracking-[0.24em] text-neutral-500">
        Loading saved article
      </p>
    );
  }

  return (
    <section className="space-y-10" aria-label={`${title} PDF pages`}>
      {Array.from({ length: pageCount }, (_, index) => (
        <PdfPageCanvas
          key={index}
          document={document}
          pageNumber={index + 1}
          title={title}
        />
      ))}
    </section>
  );
}
