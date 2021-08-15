export default function fileicon(type) {
  const obj = [
    { type: "pdf", icon: "mdi-file-pdf-outline" },
    { type: "xls", icon: "mdi-file-excel-outline" },
    { type: "xlsx", icon: "mdi-file-excel-outline" },
    { type: "doc", icon: "mdi-file-word-outline" },
    { type: "docx", icon: "mdi-file-word-outline" },
    { type: "png", icon: "mdi-file-image-outline" },
    { type: "jpg", icon: "mdi-file-image-outline" },
    { type: "jpeg", icon: "mdi-file-image-outline" },
    { type: "gif", icon: "mdi-file-image-outline" },
    { type: "sql", icon: "mdi-database" },
    { type: "txt", icon: "mdi-file-document-outline" },
    { type: "zip", icon: "mdi-zip-box-outline" },
    { type: "gzip", icon: "mdi-zip-box-outline" },
    { type: "rar", icon: "mdi-zip-box-outline" }
  ];
  return obj.find(item => item.type == type)?.icon || "mdi-file-question-outline";
}
