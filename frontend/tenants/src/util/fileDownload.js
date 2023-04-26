// download a file from blob url
export function download(url, fileName) {
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  // remove the created url after download
  URL.revokeObjectURL(link);
}
