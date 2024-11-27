function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0'); 
  return `${hours}:${minutes}`;
}

export function formatExtendedDateTime(dateString: string): string {
  const date = new Date(dateString);
  return `${formatDate(date)} às ${formatTime(date)}`;
} 
