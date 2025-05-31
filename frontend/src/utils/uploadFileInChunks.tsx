// utils/uploadFileInChunks.ts
import axios from 'axios';
export async function uploadAndMergeFile(
  file: File,
  setProgress: (v: number) => void
): Promise<string> {
  const chunkSize = 1024 * 100;
  const totalChunks = Math.ceil(file.size / chunkSize);
  const fileId = `${file.name}-${Date.now()}`;

  // 1. slice
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append("file_id", fileId);
    formData.append("chunk_index", i.toString());
    formData.append("file", chunk);

    await axios.post("/api/upload_chunk/", formData);
    setProgress(Math.round(((i + 1) / totalChunks) * 100));
  }

  // 2. merge
  const formData = new FormData();
  formData.append("file_id", fileId);
  formData.append("total_chunks", totalChunks.toString());
  formData.append("filename", file.name);

  const mergeRes = await axios.post("/api/merge_chunks/", formData);
  return mergeRes.data.path as string; // merged file path
}
