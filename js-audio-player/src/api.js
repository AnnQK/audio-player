export async function fetchSongs() {
  const res = await fetch("https://songs-db.vercel.app/songs");
  const data = await res.json();
  return data;
}
