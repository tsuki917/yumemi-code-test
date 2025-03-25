"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl text-center text-error">
        都道府県データの取得失敗
      </h2>
      <button
        className="mt-4 rounded-md bg-primary px-4 py-2 text-sm transition-colors hover:bg-blue-400"
        onClick={() => reset()}
      >
        再取得
      </button>
    </main>
  );
}
