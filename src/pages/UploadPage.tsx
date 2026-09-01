import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  Loader2,
  Linkedin,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth';
import { cn } from '@/lib/utils';
import { toast } from '@/lib/toast';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: 'resume' | 'portfolio' | 'projects';
  progress: number;
  status: 'uploading' | 'processed' | 'failed';
  text?: string;
}

interface StoredSource {
  name: string;
  type: 'resume' | 'portfolio' | 'projects';
  text: string;
}

const ACCEPTED = '.pdf,.docx,.txt';
const MAX_SIZE = 10 * 1024 * 1024;

const slots = [
  {
    type: 'resume' as const,
    label: 'Resume',
    hint: 'PDF, DOCX or TXT',
  },
  {
    type: 'portfolio' as const,
    label: 'Portfolio',
    hint: 'PDF, DOCX or TXT',
  },
  {
    type: 'projects' as const,
    label: 'Projects / supporting files',
    hint: 'PDF, DOCX or TXT',
  },
];

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(0)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function extractPdfText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);

    const content = await page.getTextContent();

    const pageText = content.items
      .map((item) => {
        if ('str' in item) {
          return item.str;
        }

        return '';
      })
      .join(' ');

    pages.push(pageText);
  }

  return pages.join('\n\n');
}

async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer,
  });

  return result.value;
}

async function extractTextFile(file: File): Promise<string> {
  return await file.text();
}

async function extractFileText(file: File): Promise<string> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'pdf') {
    return await extractPdfText(file);
  }

  if (extension === 'docx') {
    return await extractDocxText(file);
  }

  if (extension === 'txt') {
    return await extractTextFile(file);
  }

  throw new Error('Unsupported file type');
}

function saveSources(
  files: UploadedFile[],
  linkedinUrl: string,
  linkedinText: string,
) {
  const sources: StoredSource[] = files
    .filter(
      (file) =>
        file.status === 'processed' &&
        file.text &&
        file.text.trim().length > 0,
    )
    .map((file) => ({
      name: file.name,
      type: file.type,
      text: file.text || '',
    }));

  const payload = {
    files: sources,
    linkedinUrl: linkedinUrl.trim(),
    linkedinText: linkedinText.trim(),
    savedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(
    'brandlens_sources',
    JSON.stringify(payload),
  );
}

export default function UploadPage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [linkedinText, setLinkedinText] = useState('');

  const inputRefs = useRef<
    Record<string, HTMLInputElement | null>
  >({});

  const processFile = async (
    file: File,
    type: UploadedFile['type'],
  ) => {
    if (file.size > MAX_SIZE) {
      toast('File is too large (max 10 MB)', 'error');
      return;
    }

    const id = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

    const entry: UploadedFile = {
      id,
      name: file.name,
      size: formatSize(file.size),
      type,
      progress: 10,
      status: 'uploading',
    };

    setFiles((prev) => [...prev, entry]);

    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                progress: 35,
              }
            : f,
        ),
      );

      const extractedText = await extractFileText(file);

      if (!extractedText.trim()) {
        throw new Error(
          'No readable text was found in this file.',
        );
      }

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                progress: 100,
                status: 'processed',
                text: extractedText,
              }
            : f,
        ),
      );

      toast(`${file.name} processed successfully`, 'default');
    } catch (error) {
      console.error('File processing error:', error);

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                progress: 100,
                status: 'failed',
              }
            : f,
        ),
      );

      toast(
        error instanceof Error
          ? error.message
          : `Could not process ${file.name}`,
        'error',
      );
    }
  };

  const handleFiles = (
    fileList: FileList | null,
    type: UploadedFile['type'],
  ) => {
    if (!fileList || fileList.length === 0) {
      return;
    }

    Array.from(fileList).forEach((file) => {
      processFile(file, type);
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));

    toast('File removed', 'default');
  };

  const canContinue =
    files.some(
      (f) =>
        f.status === 'processed' &&
        f.text &&
        f.text.trim().length > 0,
    ) ||
    linkedinUrl.trim() !== '' ||
    linkedinText.trim() !== '';

  const hasUploading = files.some(
    (f) => f.status === 'uploading',
  );

  const handleContinue = () => {
    if (!canContinue) {
      toast(
        'Add at least one source to continue',
        'error',
      );
      return;
    }

    if (hasUploading) {
      toast(
        'Wait for files to finish processing',
        'error',
      );
      return;
    }

    saveSources(
      files,
      linkedinUrl,
      linkedinText,
    );

    navigate('/analysis');
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <button
        onClick={() => navigate('/dashboard')}
        className="btn-ghost -ml-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink-950 text-balance lg:text-4xl">
          Let’s understand your professional identity.
        </h1>

        <p className="mt-2 text-lg text-ink-600 text-pretty">
          Connect the pieces that represent your professional journey.
        </p>
      </div>

      {/* Upload slots */}
      <div className="grid gap-5">
        {slots.map((slot) => {
          const slotFiles = files.filter(
            (f) => f.type === slot.type,
          );

          return (
            <div key={slot.type}>
              <label className="label">
                {slot.label}
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(slot.type);
                }}
                onDragLeave={() => setDragging(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(null);

                  handleFiles(
                    e.dataTransfer.files,
                    slot.type,
                  );
                }}
                onClick={() =>
                  inputRefs.current[
                    slot.type
                  ]?.click()
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' ||
                    e.key === ' '
                  ) {
                    inputRefs.current[
                      slot.type
                    ]?.click();
                  }
                }}
                className={cn(
                  'group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors',
                  dragging === slot.type
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-ink-300 bg-white hover:border-brand-300 hover:bg-ink-50',
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                  <UploadCloud className="h-6 w-6" />
                </span>

                <p className="mt-3 text-sm font-medium text-ink-700">
                  Drag & drop or{' '}
                  <span className="text-brand-700 underline-offset-2 group-hover:underline">
                    browse
                  </span>
                </p>

                <p className="mt-1 text-xs text-ink-400">
                  {slot.hint}
                </p>

                <input
                  ref={(el) => {
                    inputRefs.current[slot.type] =
                      el;
                  }}
                  type="file"
                  accept={ACCEPTED}
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    handleFiles(
                      e.target.files,
                      slot.type,
                    )
                  }
                />
              </div>

              {/* Uploaded files */}
              {slotFiles.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {slotFiles.map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white px-3.5 py-2.5"
                    >
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                          f.status === 'processed'
                            ? 'bg-mint-50 text-mint-600'
                            : f.status === 'failed'
                              ? 'bg-coral-50 text-coral-600'
                              : 'bg-brand-50 text-brand-600',
                        )}
                      >
                        {f.status === 'processed' ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : f.status === 'failed' ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink-800">
                          {f.name}
                        </p>

                        <p className="text-xs text-ink-400">
                          {f.status === 'uploading'
                            ? 'Reading file…'
                            : f.status ===
                                'processed'
                              ? 'Processed'
                              : 'Failed'}{' '}
                          · {f.size}
                        </p>

                        {f.status ===
                          'uploading' && (
                          <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink-200">
                            <div
                              className="h-full rounded-full bg-brand-500 transition-all"
                              style={{
                                width: `${f.progress}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          removeFile(f.id)
                        }
                        className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-coral-600"
                        aria-label={`Remove ${f.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* LinkedIn */}
      <div className="card p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <Linkedin className="h-5 w-5" />
          </span>

          <div>
            <h2 className="font-display text-base font-semibold text-ink-950">
              Add LinkedIn profile information
            </h2>

            <p className="text-xs text-ink-500">
              We don’t scrape LinkedIn — share your details manually.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label
              className="label"
              htmlFor="li-url"
            >
              LinkedIn URL
            </label>

            <input
              id="li-url"
              type="url"
              placeholder="https://linkedin.com/in/your-handle"
              value={linkedinUrl}
              onChange={(e) =>
                setLinkedinUrl(e.target.value)
              }
              className="input"
            />
          </div>

          <div>
            <label
              className="label"
              htmlFor="li-text"
            >
              Or paste your About / headline
            </label>

            <textarea
              id="li-text"
              rows={3}
              placeholder="Paste your LinkedIn headline and About section here…"
              value={linkedinText}
              onChange={(e) =>
                setLinkedinText(e.target.value)
              }
              className="input resize-none"
            />
          </div>
        </div>
      </div>

      {/* Continue */}
      <div className="flex items-center justify-between border-t border-ink-200 pt-6">
        <p className="text-sm text-ink-500">
          {canContinue
            ? 'Ready when you are.'
            : 'Add at least one source to continue.'}
        </p>

        <button
          onClick={handleContinue}
          disabled={
            !canContinue || hasUploading
          }
          className="btn-primary"
        >
          {hasUploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Reading files…
            </>
          ) : (
            <>
              Continue to Analysis
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}